type KeyMapping = Record<string, string>;

export const transformKeys = <T extends Record<string, unknown>>(
  obj: T,
  mapping: KeyMapping,
): Record<string, unknown> => {
  if (!obj || typeof obj !== "object") return obj;

  const transformed: Record<string, unknown> = { ...obj };

  Object.entries(mapping).forEach(([oldKey, newKey]) => {
    if (oldKey in transformed) {
      transformed[newKey] = transformed[oldKey];
      if (oldKey !== newKey) delete transformed[oldKey];
    }
  });

  return transformed;
};

export const reverseMapping = (mapping: KeyMapping): KeyMapping => {
  return Object.fromEntries(
    Object.entries(mapping).map(([key, value]) => [value, key]),
  );
};
