const ObjectId = require('mongoose').Types.ObjectId;
let errors = [];

function ValidationContract() {
  errors = [];
}

ValidationContract.prototype.isObjectIdValid = (value, message) => {
  if (ObjectId.isValid(value)) {
    if (!String(new ObjectId(value)) === value) {
      errors.push({ message: message });
    }
  } else {
    errors.push({ message: message });
  }
};

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
