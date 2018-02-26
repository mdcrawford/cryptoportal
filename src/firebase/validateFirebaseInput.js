export default function(input) {
  // the following characters are invalid for our firebase path:
  // .
  // #
  // $
  // [
  // ]
  if (input.indexOf(".") > -1) {
    return false;
  }

  if (input.indexOf("#") > -1) {
    return false;
  }

  if (input.indexOf("$") > -1) {
    return false;
  }

  if (input.indexOf("[") > -1) {
    return false;
  }

  if (input.indexOf("]") > -1) {
    return false;
  }

  console.log("TRUE");
  return true;
}
