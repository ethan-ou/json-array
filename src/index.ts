export default function convertJSONArray(obj) {
  let newObj = Object.assign({}, obj);

  const checkObject = (obj) => {
    const keys = Object.keys(obj)
      .map((currKey) => parseInt(currKey, 10))
      .sort((a, b) => a - b);
    const numberCheck = keys.every((currItem) => Number.isInteger(currItem));
    const arrayIndexCheck = keys.every((currItem, idx) => currItem === idx);
    if (keys.length === 0 || !numberCheck || !arrayIndexCheck) {
      return obj;
    }
    return Object.values(obj);
  };

  const checkAllKeys = (obj: ObjectConstructor | any[]) => {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        if (typeof obj[i] === 'object') {
          obj[i] = checkObject(obj[i]);
          checkAllKeys(obj[i]);
        }
      }
    } else {
      for (let key in obj) {
        if (typeof obj[key] === 'object') {
          obj[key] = checkObject(obj[key]);
          checkAllKeys(obj[key]);
        }
      }
    }
  };

  newObj = checkObject(obj);
  checkAllKeys(newObj);

  return newObj;
}
