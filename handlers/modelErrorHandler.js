const handler_user_errors = (err) => {
  console.log(err.message, err.code);

  const errors = { name: ""};

  //Self Made error messages
  if (err.code == 11000) {
    errors.name = "The code already exists!!";
    return errors;
  }
  if (err.message == "Koden er feil..") {
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