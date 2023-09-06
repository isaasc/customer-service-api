let errors = [];

function ValidationContract() {
  errors = [];
}

ValidationContract.prototype.isRequired = (value, message) => {
  if (!value || value.length <= 0) errors.push({ message: message });
};

ValidationContract.prototype.isValid = () => {
  return errors.length == 0;
};

ValidationContract.prototype.getErrors = () => {
  return errors;
};

module.exports = ValidationContract;
