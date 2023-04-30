import { render, screen, waitFor } from "@testing-library/react"
import { PasswordForm } from "./PasswordForm";
import userEvent from "@testing-library/user-event";

describe('Password form tests', () => {
    it('Should render password input', () => {
        render(<PasswordForm />);

        screen.getByRole('textbox');
    });

    it('Should render a button', () =>{
        render(<PasswordForm />);

        screen.getByRole('button');
    });

    it('Should have expected text in the button', () => {
        render(<PasswordForm />);

        const button = screen.getByRole('button');

        expect(button).toHaveTextContent('Validar');
    });

    it('Should render invalid password when password length is lower than 8', async () => {
        render(<PasswordForm />);

        const passwordInput = screen.getByRole('textbox');
        userEvent.type(passwordInput, 'short1');
        const validateButton = screen.getByRole('button');
        userEvent.click(validateButton);

        /*  The async keyword in the test function and await with waitFor to wait for the error message to appear. 
            This ensures that the test waits for the state to update before checking if the error message is rendered.
         */
        await waitFor(() => 
            screen.getByText('La contraseña tiene menos de 8 caracteres')
        );
    });
})