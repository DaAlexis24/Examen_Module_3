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
                const mockProducts = [{ id: '1', name: 'Test' }];
                repo.read = vi.fn().mockResolvedValueOnce(mockProducts);
                // Act
                await controller.getAll(req, res, next);
                // Assert
                expect(res.json).toHaveBeenCalledWith({
                    results: mockProducts,
                    error: '',
                });
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

    describe('When it called getById method', () => {
        describe('And repo return valid data', () => {
            test('Then it returns a json with a product', async () => {
                // Arrange
                const mockProduct = { id: 1 };
                req.params = { id: '1' };
                repo.readById = vi.fn().mockResolvedValueOnce(mockProduct);
                // Act
                await controller.getById(req, res, next);
                // Assert
                expect(res.json).toHaveBeenCalledWith({
                    results: [mockProduct],
                    error: '',
                });
                expect(next).not.toHaveBeenCalled();
            });
        });
        describe('And repo throw an Error', () => {
            // Assert
            test('', async () => {
                // Arrange
                req.params = { id: '1' };
                repo.readById = vi.fn().mockRejectedValueOnce(new Error());
                // Act
                await controller.getById(req, res, next);
                // Assert
                expect(next).toHaveBeenCalledWith(
                    expect.objectContaining({} as Error),
                );
            });
        });
    });

    describe('When it called create method', () => {
        describe('And repo return valid data', () => {
            test('Then it return 201 status and json with a product', async () => {
                // Arrange
                const mockProduct = { id: 1 };
                req.body = { name: 'Test' };
                repo.create = vi.fn().mockResolvedValueOnce(mockProduct);
                // Act
                await controller.create(req, res, next);
                // Assert
                expect(res.status).toHaveBeenCalledWith(201);
                expect(res.json).toHaveBeenCalledWith({
                    results: [mockProduct],
                    error: '',
                });
                expect(next).not.toHaveBeenCalled();
            });
        });
        describe('And repo throw an Error', () => {
            // Assert
            test('', async () => {
                // Arrange
                req.params = { id: '1' };
                repo.create = vi.fn().mockRejectedValueOnce(new Error());
                // Act
                await controller.create(req, res, next);
                // Assert
                expect(next).toHaveBeenCalledWith(
                    expect.objectContaining({} as Error),
                );
            });
        });
    });

    describe('When it called update method', () => {
        describe('And the repo return valid data', () => {
            test('Then it return a json with a new data for the product', async () => {
                // Arrange
                const mockProduct = { id: 1, name: 'New Test' };
                req.params = { id: '1' };
                req.body = { name: 'New Test' };
                repo.update = vi.fn().mockResolvedValueOnce(mockProduct);
                // Act
                await controller.update(req, res, next);
                // Assert
                expect(repo.update).toHaveBeenCalledWith('1', req.body);
                expect(res.json).toHaveBeenCalledWith({
                    results: [mockProduct],
                    error: '',
                });
                expect(next).not.toHaveBeenCalled();
            });
        });
        describe('And repo throw an Error', () => {
            // Assert
            test('', async () => {
                // Arrange
                req.params = { id: '1' };
                repo.update = vi.fn().mockRejectedValueOnce(new Error());
                // Act
                await controller.update(req, res, next);
                // Assert
                expect(next).toHaveBeenCalledWith(
                    expect.objectContaining({} as Error),
                );
            });
        });
    });

    describe('When it called delete method', () => {
        describe('And repo return a valid data', () => {
            test('Then it showed deleted product', async () => {
                // Arrange
                req.params = { id: '1' };
                const mockProduct = { id: '1', name: 'Delete Product' };
                repo.delete = vi.fn().mockResolvedValueOnce(mockProduct);
                // Act
                await controller.delete(req, res, next);
                // Assert
                expect(repo.delete).toHaveBeenCalledWith('1');
                expect(res.json).toHaveBeenCalledWith({
                    results: [mockProduct],
                    error: '',
                });
                expect(next).not.toHaveBeenCalled();
            });
        });
        describe('And repo throw an Error', () => {
            // Assert
            test('', async () => {
                // Arrange
                req.params = { id: '1' };
                repo.delete = vi.fn().mockRejectedValueOnce(new Error());
                // Act
                await controller.delete(req, res, next);
                // Assert
                expect(next).toHaveBeenCalledWith(
                    expect.objectContaining({} as Error),
                );
            });
        });
    });
});
