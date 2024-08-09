import { ValidatorErrorMessages } from "./ValidatorErrorMessages";

function validateUsername(username) {
  // const regex = /^[a-zA-ZáéíóúüñÑ_\s]{3,30}$/;
  // return regex.test(username);
  return true/* VER VALIDACIONES ESPECIALES */
}
function validateBio(bio) {
  const regex = /^[\w\s-]{0,200}$/;
  return regex.test(bio);
}
function validatePhone(phone) {
  const regex = /^[0-9]{10}$/;
  return regex.test(phone);
}
function validateEmail(email) {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
}
function validatePassword(password) {
  return password.length >= 3;
}


export const loginInputValidator = (user, password, isCheckedTyC) => {
  const userValidation = !validateUsername(user);
  const passwordValidation = !validatePassword(password);

  if (!userValidation && !passwordValidation && isCheckedTyC) {
    let validatorResults = { error: false, isValidated: true };
    return validatorResults;
  } else {
    let validatorResults = {
      error: {
        user: userValidation && ValidatorErrorMessages.user,
        password: passwordValidation && ValidatorErrorMessages.password,
        isCheckedTyC: !isCheckedTyC && ValidatorErrorMessages.termsAndConditions,
      },
      isValidated: false,
    };
    return validatorResults;
  }
};
