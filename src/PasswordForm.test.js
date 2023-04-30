import { render, screen } from "@testing-library/react"

function PasswordForm() {
    return <input type="text"/>;
}

describe('Password form tests', () => {
    it('Should render password input', () => {
        render(<PasswordForm />);

        screen.getByRole('textbox');
    })
})