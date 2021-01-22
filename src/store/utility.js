export const updateObject = (oldObject, updatedProps) => {
  return {
    ...oldObject,
    ...updatedProps,
  };
};
export const checkValidity = (value, rules, streamers) => {
  let errMessage = "invalid";
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
    errMessage = value.length >= rules.minLength ? null : "Length must be >6";
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    isValid = pattern.test(value) && isValid;
    if (!isValid) {
      errMessage = "Enter valid Email";
    }
  }

  if (rules.isUsername) {
    const pattern = /^[a-zA-Z0-9_]*$/;

    isValid = pattern.test(value) && isValid && value.length > 3;
    if (!isValid) {
      errMessage = "lenght >6 & should only contain a-z0-9_";
    }
    for (const i in streamers) {
      if (streamers[i].toLowerCase() === value.toLowerCase()) {
        isValid = false;
        errMessage = "Username already exists";
      }
    }
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }
  return { isValid: isValid, errMessage: isValid ? null : errMessage };
};
