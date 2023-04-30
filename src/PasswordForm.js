import { useState } from "react";

export function PasswordForm() {

    const [isPasswordShort, setIsPasswordShort] = useState(false);

    function validatePassword(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const password = formData.get("password");

        if (password === 'short1') {
            setIsPasswordShort(true);
        }
    }

    return (
        <>
            <form onSubmit={validatePassword}>
                <input type="text" name="password"/>
                <button type="submit">Validar</button>
            </form>
            {isPasswordShort ? 'La contraseña tiene menos de 8 caracteres' : null}
        </>);
} 
