/** Bound remote reads and preserve the original error for browser diagnostics. */
export async function fetchCatalogue<T>(
  load: (signal: AbortSignal) => Promise<T>,
  fallback: T,
  isEmpty: (data: T) => boolean,
  label: string,
  timeoutMs = 8000,
): Promise<T> {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => {
        controller.abort();
        reject(new Error(`${label}: request timed out after ${timeoutMs}ms`));
      }, timeoutMs);
    });
    const data = await Promise.race([load(controller.signal), timeout]);
    if (isEmpty(data)) {
      console.warn(`[Catalogue: ${label}] Database returned no rings. Using preview collection.`, data);
      return fallback;
    }
    return data;
  } catch (error) {
    console.error(`[Catalogue: ${label}] Live read failed. Using preview collection.`, error);
    return fallback;
  } finally {
    if (timer !== undefined) clearTimeout(timer);
  }
}