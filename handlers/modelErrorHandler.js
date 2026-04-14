const handler_user_errors = (err) => {
  console.log(err.message, err.code);

  const errors = { passwd: ""};

  //Self Made error messages
  if (err.code == 11000) {
    errors.passwd = "The code already exists!!";
    return errors;
  }
  if (err.message == "Koden er feil..") {
    errors.passwd = err.message;
    return errors;
  }

  //Model made errors
  Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });
  return errors;
};

handle_report_errors = (err)=>{
  console.log(err.message, err.code);

  const errors = {title: "", description: ""};

  if (err.code == 11000) {
    errors.title = "Tittelen er allerede i bruk!!";
    return errors;
  }

  Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });
  return errors;
}

module.exports = {handler_user_errors, handle_report_errors}