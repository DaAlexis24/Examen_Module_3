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
});
