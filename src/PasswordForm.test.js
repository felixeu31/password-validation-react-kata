import { act, render, screen, waitFor } from "@testing-library/react"
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

    it.each([
        ['short1'],
        ['1'],
        ['1234567']
    ])
        ('Should render invalid password when password length is lower than 8', async (password) => {
        render(<PasswordForm />);

        act(() => {
            const passwordInput = screen.getByRole('textbox');
            userEvent.type(passwordInput, password);
            const validateButton = screen.getByRole('button');
            userEvent.click(validateButton);
        });

        /*  The async keyword in the test function and await with waitFor to wait for the error message to appear. 
            This ensures that the test waits for the state to update before checking if the error message is rendered.
         */
        await waitFor(() => 
            screen.getByText('La contraseña tiene menos de 8 caracteres')
        );
    });
})