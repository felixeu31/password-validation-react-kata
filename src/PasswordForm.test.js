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
    ])('Should render invalid password when password length is lower than 8', async (password) => {
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

    it.each([
        ['longPassword'],
        ['longPasswordLonger'],
        ['longPasswordLongest']
    ])('Should render invalid password when does not contain numbers', async (password) => {
            render(<PasswordForm />);

            act(() => {
                const passwordInput = screen.getByRole('textbox');
                userEvent.type(passwordInput, password);
                const validateButton = screen.getByRole('button');
                userEvent.click(validateButton);
            });

            await waitFor(() => {
                screen.getByText('La contraseña debe contener números');
            });
    });

    it('Should render invalid password due to lenght lower than 8 and does not contain any number', async () => {
        render(<PasswordForm />);

        act(() => {
            const passwordInput = screen.getByRole('textbox');
            userEvent.type(passwordInput, 'short');
            const validateButton = screen.getByRole('button');
            userEvent.click(validateButton);
        });

        await waitFor(() => {
            screen.getByText('La contraseña tiene menos de 8 caracteres');
            screen.getByText('La contraseña debe contener números');
        })
    });

    it.each([
        ['validPassword1'],
        ['validPassword2']
    ])('Should render valid passwords', async (password) => {
        render(<PasswordForm />);

        const passwordInput = screen.getByRole('textbox');
        const validateButton = screen.getByRole('button');

        act(() => {
            userEvent.type(passwordInput, password);
            userEvent.click(validateButton);
        });

        await waitFor(() => {
            screen.getByText(password);
        });
    });

    it('Should render all valid passwords', async () => {
        render(<PasswordForm />);

        const passwordInput = screen.getByRole('textbox');
        const validateButton = screen.getByRole('button');

        act(() => {
            userEvent.type(passwordInput, 'validPassword1');
            userEvent.click(validateButton);
            userEvent.clear(passwordInput);
        });
        
        act(() => {
            userEvent.type(passwordInput, 'validPassword2');
            userEvent.click(validateButton);
        });

        await waitFor(() => {
            screen.getByText('validPassword1');
            screen.getByText('validPassword2');
        });
    });

    it('should not render error message when password is valid', async () => {
        render(<PasswordForm />);
      
        const passwordInput = screen.getByRole('textbox');
        const validateButton = screen.getByRole('button');

        act(() => {
          userEvent.type(passwordInput, 'validPassword1');
          userEvent.click(validateButton);
        });
      
        await waitFor(() =>{
            expect(screen.queryByText('La contraseña tiene menos de 8 caracteres')).toBeNull()
            expect(screen.queryByText('La contraseña debe contener números')).toBeNull()
        });
      });
})