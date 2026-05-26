import { ProductsController } from './products.controller';
import { NextFunction, Request, Response } from 'express';

describe('Given instance of Products Controller', () => {
    const repo = {
        read: vi.fn(),
        readById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    };
    let controller: ProductsController;
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(async () => {
        req = {} as Request;
        res = {
            json: vi.fn(),
            status: vi.fn(),
        } as unknown as Response;
        next = vi.fn() as NextFunction;
        controller = new ProductsController(repo);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    // Estos tests los hice para corroborar que el entorno que cree en BeforeEach me permita realizar los tests de manera correcta
    describe('When we instantiate it', () => {
        test('Then it should be defined', () => {
            expect(controller).toBeDefined();
        });
        test('Then it should be an instance of ProductsController', () => {
            expect(controller).toBeInstanceOf(ProductsController);
        });
    });

    describe('When it called getAll method', () => {
        describe('And repo return valid data', () => {
            test('Then it returns a array of products', async () => {
                // Arrange
                const methodRepo = (repo.read = vi
                    .fn()
                    .mockResolvedValueOnce([]));
                // Act
                await controller.getAll(req, res, next);
                // Assert
                expect(methodRepo).toHaveBeenCalled();
                expect(next).not.toHaveBeenCalled();
            });
        });
        describe('And repo throw an Error', () => {
            // Assert
            test('', async () => {
                // Arrange
                repo.read = vi.fn().mockRejectedValueOnce(new Error());
                // Act
                await controller.getAll(req, res, next);
                // Assert
                expect(next).toHaveBeenCalledWith(
                    expect.objectContaining({} as Error),
                );
            });
        });
    });
});
