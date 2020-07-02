export type JSONObject = Record<string, unknown> | Array<unknown>;

/**
 * Converts a JSON object with strings for array indicies
 * into a Javascript array.
 * @param object JSON object.
 */
export default function JSONArray(object: JSONObject): JSONObject {
  //Check the object itself once before checking all of its keys.
  return checkAllKeys(convertArrayIndexKeys({ ...object }));
}

/**
 * Checks for keys in an object that are possibly array indicies.
 * When a match is found, returns a new array with the items of the
 * object.
 * @param object Input object
 * @returns {boolean} Returns true if object is a possible array.
 */
export const convertArrayIndexKeys = (object: JSONObject): JSONObject => {
  const keyIdx: number[] = [];
  for (const key in object) {
    const numberConversion = Number.parseInt(key, 10);
    if (!Number.isInteger(numberConversion) || numberConversion < 0) {
      return object;
    }

    keyIdx.push(numberConversion);
  }

  if (keyIdx.length === 0) {
    return object;
  }

  // Sort in case keys are out of order.
  const sortedKeyIdx = keyIdx.sort((a, b) => a - b);

  for (let i = 0; i < keyIdx.length; i++) {
    if (sortedKeyIdx[i] !== i) {
      return object;
    }
  }

  return Object.values(object);
};

/**
 * Recursively checks through an object for indicies that can
 * be converted into an array.
 * @param object
 */
const checkAllKeys = (object: JSONObject): JSONObject => {
  const checkArrayKeys = (object: Array<unknown>) =>
    object.map((item) =>
      typeof item === 'object'
        ? checkAllKeys(convertArrayIndexKeys(item as JSONObject))
        : item,
    );

  const checkObjectKeys = (object: Record<string, unknown>) => {
    const result = Object.assign({}, object);
    for (const key in result) {
      if (typeof object[key] === 'object') {
        result[key] = checkAllKeys(
          convertArrayIndexKeys(result[key] as JSONObject),
        );
      }
    }

    return result;
  };

  return Array.isArray(object)
    ? checkArrayKeys(object)
    : checkObjectKeys(object);
};
