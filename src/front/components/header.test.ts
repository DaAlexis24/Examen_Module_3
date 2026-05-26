import { createHeader } from './header';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';

describe('Given a Header Component', () => {
    describe('When it used createHeader', () => {
        // Esto es porque cada vez que se usa este componente, se crea un bloque HTML
        beforeEach(() => {
            document.body.innerHTML = '';
            createHeader();
        });

        test('Then it render logo, title and button', () => {
            // Act
            const logo = screen.getByAltText('Logo de la empresa');
            const title = screen.getByRole('heading', { name: /productos/i });
            const button = screen.getByRole('button', { name: /add/i });

            // Assert
            expect(logo).toBeInTheDocument();
            expect(title).toBeInTheDocument();
            expect(button).toBeInTheDocument();
        });

        test('Then Add button has correct attributes', () => {
            // Act
            const button = screen.getByRole('button', { name: /add/i });
            // Arrange
            expect(button).toHaveAttribute('aria-expanded', 'false');
            expect(button).toHaveAttribute('aria-controls', 'add');
        });

        test('Then it exists details with a summary inside it', () => {
            // Act
            const summary = screen.getByText('Add', { selector: 'summary' });
            // Arrange
            expect(summary).toBeInTheDocument();
        });
    });
});
