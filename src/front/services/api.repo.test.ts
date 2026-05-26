import { ApiRepo } from './api.repo';
import { Product } from '../types/product';

describe('Given a instance of ApiRepo', () => {
    const repo = new ApiRepo();
    const mockProduct: Product = {
        id: 1,
        name: 'Test Product',
        price: 9.99,
        category: 'components',
        description: 'test',
        hasPromo: false,
    };

    describe('When the method getProducts is called', () => {
        describe('And fetch response is OK', () => {
            beforeEach(() => {
                vi.spyOn(globalThis, 'fetch').mockResolvedValue({
                    ok: true,
                    json: vi.fn().mockResolvedValueOnce(mockProduct),
                } as unknown as Response);
            });

            test('Then it response with the fetch data', async () => {
                // Act
                const products = await repo.getProducts();
                // Arrange
                expect(fetch).toHaveBeenCalled();
                expect(products).toEqual(mockProduct);
            });
        });

        describe('And fetch response is not OK', () => {
            beforeEach(() => {
                // Arrange
                vi.spyOn(globalThis, 'fetch').mockResolvedValue({
                    ok: false,
                } as unknown as Response);
            });
            test('Then it reject the promise', async () => {
                // Act and Assert
                expect(repo.getProducts()).rejects.toThrow();
            });
        });
    });

    describe('When method createProduct is called', () => {
        describe('And fetch response is OK', () => {
            beforeEach(() => {
                vi.spyOn(globalThis, 'fetch').mockResolvedValue({
                    ok: true,
                    json: vi.fn().mockResolvedValueOnce(mockProduct),
                } as unknown as Response);
            });
            test('Then it create a product', async () => {
                // Act
                const result = await repo.createProduct(mockProduct);
                // Arrange
                expect(result).toEqual(mockProduct);
            });
        });

        describe('And fetch response is not OK', () => {
            beforeEach(() => {
                // Arrange
                vi.spyOn(globalThis, 'fetch').mockResolvedValue({
                    ok: false,
                } as unknown as Response);
            });
            test('Then it reject the promise', async () => {
                // Act and Assert
                expect(repo.createProduct(mockProduct)).rejects.toThrow();
            });
        });
    });
});
