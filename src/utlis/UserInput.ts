interface Output {
  isValid: boolean;
  issues: {
    email?: string;
    firstName?: string;
    lastName?: string;
    invalidFields?: string;
  };
}

class UserInput {
  static emailValidator = ({ email }) => {
    const emailFilter = /^$/;
    return emailFilter.test(email);
  };

  static validateFiels = (requestBody, requiredField) => {
    const output: Output = {
        isValid: true,
        issues: {}
    }

    // check all fields are valid or not 

    return output
  }
}


export default UserInput