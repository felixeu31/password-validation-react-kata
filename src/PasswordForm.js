import { useState } from "react";

export function PasswordForm() {

    const [isPasswordShort, setIsPasswordShort] = useState(false);

    function validatePassword(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const password = formData.get("password");

        if (passwordLenghtIsLowerThan8(password)) {
            setIsPasswordShort(true);
        }
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
        </>);

} 
