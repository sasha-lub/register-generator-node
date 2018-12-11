const validate = regModel => {
  const errors = {};
  if (!regModel.name) {
    errors.name = 'Required'
  }
  return errors
};

export default validate;