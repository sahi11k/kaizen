/**
 * Generic transformation utility for converting object keys
 * @param {Object} obj - The object to transform
 * @param {Object} mapping - Key mapping object (oldKey: newKey)
 * @returns {Object} - Transformed object
 */
export const transformKeys = (obj, mapping) => {
  if (!obj || typeof obj !== "object") return obj;

  const transformed = { ...obj };

  Object.entries(mapping).forEach(([oldKey, newKey]) => {
    if (oldKey in transformed) {
      transformed[newKey] = transformed[oldKey];
      delete transformed[oldKey];
    }
  });

  return transformed;
};

/**
 * Creates a reverse mapping from the given mapping object
 * @param {Object} mapping - Original mapping object
 * @returns {Object} - Reversed mapping object
 */
export const reverseMapping = (mapping) => {
  return Object.fromEntries(
    Object.entries(mapping).map(([key, value]) => [value, key])
  );
};
