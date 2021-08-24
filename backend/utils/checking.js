const isEmpty = (val) => {
  let typeOfVal = typeof val;
  switch (typeOfVal) {
    case "object":
      return val.length == 0 || !Object.keys(val).length;
      break;
    case "string":
      let str = val.trim();
      return str == "" || str == undefined;
      break;
    case "number":
      return val == "";
      break;
    default:
      return val == "" || val == undefined;
  }
};

const checkForEmail = (email) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

export { isEmpty, checkForEmail };
