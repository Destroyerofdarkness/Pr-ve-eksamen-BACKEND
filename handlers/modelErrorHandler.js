const handler_user_errors = (err) => {
  console.log(err.message, err.code);

  const errors = { name: "", passwd: "" };

  //Self Made error messages
  if (err.code == 11000) {
    errors.name = "The username is already in use!!";
    return errors;
  }
  if (err.message == "Provided passwords doesn't match!!") {
    errors.passwd = err.message;
    return errors;
  }
  if (err.message == "Provided password is not right!!") {
    errors.passwd = err.message;
    return errors;
  }
  if (err.message == "Provided user not Found!!") {
    errors.name = err.message;
    return errors;
  }

  //Model made errors
  Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });
  return errors;
};


module.exports = {handler_user_errors}