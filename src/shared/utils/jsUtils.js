export function deepCopy(obj) {
  if (!obj) return obj;

  if (!window.structuredClone) {
    return JSON.parse(JSON.stringify(obj));
  }
  return window.structuredClone(obj);
}

export const arraysEqual = (arr1, arr2) => {
  if (arr1 === arr2) return true;
  if (!arr1 || !arr2) return false;
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const upsertById = (items = [], newItem) => {
  const exists = items.some((item) => item.id === newItem.id);
  return exists
    ? items.map((item) => (item.id === newItem.id ? newItem : item))
    : [...items, newItem];
};

export const deleteById = (items = [], itemId) => {
  return items.filter((item) => item.id !== itemId);
};
