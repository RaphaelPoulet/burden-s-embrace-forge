# Project rules
- Keep catalogue recovery in a shared fetch helper with an eight-second deadline; public lists and detail queries must use the same recovery behavior.
- Mark default catalogue records as read-only previews; never expose them through the admin list or allow cart or product writes from preview controls.
- Keep the generated Cloud client and environment configuration unchanged; diagnose hosted availability before changing access policies.