import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { createFormAdd } from './form.add';

describe('Given Form Add Component', () => {
    // Esto es porque cada vez que se usa este componente, se crea un bloque HTML
    beforeEach(() => {
        document.body.innerHTML = '';
    });
    describe('When it calls createFormAdd', () => {
        test('Then it render the form', () => {
            // Arrange
            createFormAdd();
            // Act
            const form = screen.getByRole('form', { name: /add_form/i });
            const button = screen.getByRole('button', { name: /crear/i });
            // Assert
            expect(form).toBeInTheDocument();
            expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/promo/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
            expect(button).toBeInTheDocument();
        });
    });
});
