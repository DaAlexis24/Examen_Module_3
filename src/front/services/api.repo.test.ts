import { ApiRepo } from './api.repo';
import { Product } from '../types/product';

describe('Given a instance of ApiRepo', () => {
    const repo = new ApiRepo();
    const mockProduct: Product = {} as Product;

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
});
