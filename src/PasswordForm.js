import { useState } from "react";

function validate(password) {
    const validations = [];

    if (passwordLenghtIsLowerThan8(password)) {
        validations.push('La contraseña tiene menos de 8 caracteres');
    }

    if (!doesPasswordContainAnyNumber(password)) {
        validations.push('La contraseña debe contener números');
    }
    return validations;
}

function doesPasswordContainAnyNumber(password) {
    for(const character of password){
        const isNumber = !isNaN(Number(character));

        if (isNumber) {
            return true;
        }
    }
    
    return false;
}

function passwordLenghtIsLowerThan8(password) {
    return password.length < 8;
}

export function PasswordForm() {

    const [validationMessages, setValidationMessages] = useState([]);
    const [validPasswords, setValidPasswords] = useState([]);

    function validatePassword(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const password = formData.get("password");

        const validationErrors = validate(password);
        setValidationMessages(validationErrors);

        if (validationErrors.length === 0) {
            setValidPasswords([...validPasswords, password]);
        }
    }  

    return (
        <>
            <form onSubmit={validatePassword}>
                <input type="text" name="password"/>
                <button type="submit">Validar</button>
            </form>
            <ul>
                {validationMessages.map((message, index) => <li key={`${message}-${index}`}>{message}</li>)}    
            </ul>
            <ul>
                {validPasswords.map((password, index) => <li key={`${password}-${index}`}>{password}</li>)}
            </ul>
        </>);

} 
