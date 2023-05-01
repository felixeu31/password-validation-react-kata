import { useState } from "react";

export function PasswordForm() {

    const [isPasswordShort, setIsPasswordShort] = useState(false);
    const [passwordNotContainNumbers, setPasswordNotContainNumbers] = useState(false);

    function validatePassword(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const password = formData.get("password");

        if (passwordLenghtIsLowerThan8(password)) {
            setIsPasswordShort(true);
        }

        if(!doesPasswordContainAnyNumber(password)){
            setPasswordNotContainNumbers(true);
        }
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

    return (
        <>
            <form onSubmit={validatePassword}>
                <input type="text" name="password"/>
                <button type="submit">Validar</button>
            </form>
            {isPasswordShort ? <span>La contraseña tiene menos de 8 caracteres</span> : null}
            {passwordNotContainNumbers ? <span>La contraseña debe contener números</span> : null}        
        </>);

} 
