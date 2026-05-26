import '@testing-library/jest-dom';
import { screen, fireEvent } from '@testing-library/dom';
import { createFormAdd } from './form.add';
import { Product } from '../types/product';

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

    describe('When it calls a handleSubmit', () => {
        test('Then it used data form', () => {
            // Arrange
            const spyConsole = vi.spyOn(console, 'log');
            const products: Product[] = [
                {
                    id: 1,
                    name: 'test',
                    description: 'test',
                    price: 10,
                    category: 'components',
                    hasPromo: false,
                },
            ];
            createFormAdd(products);
            // Act
            fireEvent.input(screen.getByLabelText(/name/i), {
                target: { value: 'Nuevo producto' },
            });
            fireEvent.input(screen.getByLabelText(/description/i), {
                target: { value: 'Una descripción' },
            });
            fireEvent.input(screen.getByLabelText(/price/i), {
                target: { value: '100' },
            });
            fireEvent.click(screen.getByLabelText(/promo/i));
            fireEvent.change(screen.getByLabelText(/category/i), {
                target: { value: 'computer' },
            });
            fireEvent.submit(screen.getByRole('form', { name: /add_form/i }));
            // Assert
            expect(spyConsole).toHaveBeenCalledWith(
                'Form submitted:',
                expect.objectContaining({
                    id: 2,
                    name: 'Nuevo producto',
                    description: 'Una descripción',
                    price: 100,
                    hasPromo: true,
                    category: 'computer',
                }),
            );
        });
    });
});
