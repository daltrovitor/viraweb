// Hello World
/** Normalizes rewritten paths (/sites/ops/orders) back to the public form (/orders). */
export function publicOpsPath(pathname: string): string {
  const stripped = pathname.replace(/^\/sites\/ops(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}
