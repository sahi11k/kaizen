export function deepCopy(obj) {
  if (!obj) return obj;

  if (!window.structuredClone) {
    return JSON.parse(JSON.stringify(obj));
  }
  return window.structuredClone(obj);
}
