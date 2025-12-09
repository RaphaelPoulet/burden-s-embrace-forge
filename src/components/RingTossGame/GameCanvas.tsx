import { useEffect, useRef, useState, useCallback } from 'react';
import Matter from 'matter-js';

interface GameCanvasProps {
  onScore: () => void;
  onMiss: () => void;
  isPlaying: boolean;
}

export const GameCanvas = ({ onScore, onMiss, isPlaying }: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const ringRef = useRef<Matter.Body | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragCurrent, setDragCurrent] = useState({ x: 0, y: 0 });
  const hasScored = useRef(false);
  const launchTimeout = useRef<NodeJS.Timeout | null>(null);

  const RING_START = { x: 120, y: 450 };
  const TARGET_X = 580;
  const TARGET_TOP = 280;
  const SPIKE_WIDTH = 20;

  const createRing = useCallback((world: Matter.World) => {
    if (ringRef.current) {
      Matter.World.remove(world, ringRef.current);
    }

    const ring = Matter.Bodies.circle(RING_START.x, RING_START.y, 25, {
      restitution: 0.3,
      friction: 0.8,
      frictionAir: 0.02,
      density: 0.002,
      label: 'ring',
      isStatic: true,
      render: {
        fillStyle: 'transparent',
        strokeStyle: '#D4AF37',
        lineWidth: 6,
      },
    });

    ringRef.current = ring;
    hasScored.current = false;
    Matter.World.add(world, ring);
    return ring;
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !isPlaying) return;

    const canvas = canvasRef.current;
    const width = 700;
    const height = 550;

    // Create engine
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.8 },
    });
    engineRef.current = engine;

    // Create renderer
    const render = Matter.Render.create({
      canvas,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
      },
    });
    renderRef.current = render;

    // Create the spike/target
    const spikeBase = Matter.Bodies.rectangle(TARGET_X, 480, 80, 40, {
      isStatic: true,
      label: 'base',
      render: {
        fillStyle: '#1a1a1a',
        strokeStyle: '#8B0000',
        lineWidth: 2,
      },
    });

    const spikeBody = Matter.Bodies.rectangle(TARGET_X, 380, 30, 200, {
      isStatic: true,
      label: 'tower',
      render: {
        fillStyle: '#0d0d0d',
        strokeStyle: '#8B0000',
        lineWidth: 1,
      },
    });

    const spikeTop = Matter.Bodies.trapezoid(TARGET_X, TARGET_TOP - 20, SPIKE_WIDTH, 60, 0.8, {
      isStatic: true,
      label: 'spike',
      render: {
        fillStyle: '#1a0000',
        strokeStyle: '#D4AF37',
        lineWidth: 2,
      },
    });

    // Invisible sensors for scoring
    const scoreSensorLeft = Matter.Bodies.rectangle(TARGET_X - 20, TARGET_TOP + 30, 5, 40, {
      isStatic: true,
      isSensor: true,
      label: 'scoreLeft',
      render: { visible: false },
    });

    const scoreSensorRight = Matter.Bodies.rectangle(TARGET_X + 20, TARGET_TOP + 30, 5, 40, {
      isStatic: true,
      isSensor: true,
      label: 'scoreRight',
      render: { visible: false },
    });

    // Ground
    const ground = Matter.Bodies.rectangle(width / 2, height + 20, width, 40, {
      isStatic: true,
      label: 'ground',
      render: { visible: false },
    });

    // Walls
    const leftWall = Matter.Bodies.rectangle(-20, height / 2, 40, height, {
      isStatic: true,
      label: 'wall',
      render: { visible: false },
    });

    const rightWall = Matter.Bodies.rectangle(width + 20, height / 2, 40, height, {
      isStatic: true,
      label: 'wall',
      render: { visible: false },
    });

    Matter.World.add(engine.world, [
      spikeBase,
      spikeBody,
      spikeTop,
      scoreSensorLeft,
      scoreSensorRight,
      ground,
      leftWall,
      rightWall,
    ]);

    // Create initial ring
    createRing(engine.world);

    // Collision detection
    let touchedLeft = false;
    let touchedRight = false;

    Matter.Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        const labels = [pair.bodyA.label, pair.bodyB.label];

        if (labels.includes('ring')) {
          if (labels.includes('scoreLeft')) touchedLeft = true;
          if (labels.includes('scoreRight')) touchedRight = true;

          if (touchedLeft && touchedRight && !hasScored.current) {
            hasScored.current = true;
            setTimeout(() => onScore(), 500);
          }

          if (labels.includes('ground') && !hasScored.current) {
            if (launchTimeout.current) {
              clearTimeout(launchTimeout.current);
            }
            launchTimeout.current = setTimeout(() => {
              onMiss();
              touchedLeft = false;
              touchedRight = false;
              createRing(engine.world);
            }, 800);
          }
        }
      });
    });

    // Start the engine
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    return () => {
      if (launchTimeout.current) {
        clearTimeout(launchTimeout.current);
      }
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    };
  }, [isPlaying, onScore, onMiss, createRing]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ringRef.current || !ringRef.current.isStatic) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Only start drag near the ring
    const ringPos = ringRef.current.position;
    const dist = Math.sqrt((x - ringPos.x) ** 2 + (y - ringPos.y) ** 2);

    if (dist < 60) {
      setIsDragging(true);
      setDragStart({ x, y });
      setDragCurrent({ x, y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setDragCurrent({ x, y });
  };

  const handleMouseUp = () => {
    if (!isDragging || !ringRef.current || !engineRef.current) {
      setIsDragging(false);
      return;
    }

    const dx = dragStart.x - dragCurrent.x;
    const dy = dragStart.y - dragCurrent.y;
    const power = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.15, 25);

    // Make the ring dynamic and apply force
    Matter.Body.setStatic(ringRef.current, false);
    Matter.Body.setVelocity(ringRef.current, {
      x: dx * 0.08,
      y: dy * 0.08 - power * 0.3,
    });

    setIsDragging(false);
  };

  // Custom render for trajectory line and ring glow
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawOverlay = () => {
      // Draw trajectory line when dragging
      if (isDragging && ringRef.current) {
        const ringPos = ringRef.current.position;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(ringPos.x, ringPos.y);
        ctx.lineTo(
          ringPos.x + (dragStart.x - dragCurrent.x) * 2,
          ringPos.y + (dragStart.y - dragCurrent.y) * 2
        );
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
        ctx.lineWidth = 3;
        ctx.setLineDash([10, 5]);
        ctx.stroke();
        ctx.restore();

        // Power indicator
        const power = Math.sqrt(
          (dragStart.x - dragCurrent.x) ** 2 + (dragStart.y - dragCurrent.y) ** 2
        );
        const powerPercent = Math.min(power / 200, 1);

        ctx.save();
        ctx.fillStyle = `rgba(${139 + powerPercent * 116}, ${powerPercent * 50}, 0, 0.8)`;
        ctx.fillRect(20, 20, powerPercent * 100, 10);
        ctx.strokeStyle = '#D4AF37';
        ctx.strokeRect(20, 20, 100, 10);
        ctx.restore();
      }

      // Draw ring glow
      if (ringRef.current) {
        const pos = ringRef.current.position;
        ctx.save();
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 35, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212, 175, 55, 0.1)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 6;
        ctx.shadowColor = '#D4AF37';
        ctx.shadowBlur = 15;
        ctx.stroke();
        ctx.restore();
      }

      requestAnimationFrame(drawOverlay);
    };

    const animationId = requestAnimationFrame(drawOverlay);
    return () => cancelAnimationFrame(animationId);
  }, [isDragging, dragStart, dragCurrent]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={700}
        height={550}
        className="cursor-crosshair rounded-lg"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      {/* Mount Doom background layers */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-magma-900/80 via-background to-background" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-magma-600/30 to-transparent" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-20 bg-magma-500/20 blur-3xl rounded-full" />
        <div className="absolute top-20 right-20 w-16 h-16 bg-magma-400/10 blur-2xl rounded-full animate-pulse" />
      </div>
    </div>
  );
};
