import UserInput from "../utlis/UserInput"
import Response from '../utlis/Response';

class Validator{
    static validateSignup = (request, response, next) => {
        const { validateFiels } = UserInput
        const { isValid, issues } = validateFiels(request.body, [
            'email',
            'password',
            'firstName',
            'lastName'
        ])

        if(!isValid){
            return Response.errorResponse(response, 400, 'invalid input', issues);
        }
        next()
    }

    static validateLogin = (request, response, next) => {
        const { validateFiels } = UserInput
        const { isValid, issues } = validateFiels(request.body, [
            'email',
            'password'
        ])

        if(!isValid){
            return Response.errorResponse(response, 400, 'invalid input', issues);
        }
        next()
    }
}

export default Validator;