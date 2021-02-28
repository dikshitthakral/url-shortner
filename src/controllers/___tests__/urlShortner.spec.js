const urlShortnerService = require('../../services/urlShortner.service');
const urlShortner = require('../urlShortner');

jest.mock('../../services/urlShortner.service');

describe('url shortner controller', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    describe('#createShortUrl', () => {
        it('should respond with 200 with correct payload', async () => {
            // Given
            const urlData = {
                url: "https://stackoverflow.com",
                description: "Stackoverflow",
                id: "ghart12rt9"
            };
            const req = {
                body: {
                    url: "https://stackoverflow.com", description: "Stackoverflow"
                }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            (urlShortnerService.create).mockResolvedValueOnce(
                urlData
            );
            // When
            await urlShortner.createShortUrl(req, res);
            expect(res).toBeDefined();
            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledWith({
                message: "Success",
                data:
                {
                    url: "https://stackoverflow.com",
                    description: "Stackoverflow",
                    id: "ghart12rt9"
                }
            });
        });

        it('should respond with 400 with url missing in payload', async () => {
            // Given
            const urlData = {
                url: "",
                description: "Stackoverflow",
                id: "ghart12rt9"
            };
            const req = {
                body: {
                    url: "", description: "Stackoverflow"
                }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            (urlShortnerService.create).mockResolvedValueOnce(
                urlData
            );
            // When
            await urlShortner.createShortUrl(req, res);
            expect(res).toBeDefined();
            expect(res.status).toBeCalledWith(400);
            expect(res.json).toBeCalledWith({
                message: "Error",
                data: {},
                error: "Url cannot be empty"
            });
        });


        it('should respond with 400 with error in payload', async () => {
            // Given
            const urlData = {
                url: "https://stackoverflow.com",
                description: "Stackoverflow",
                id: "ghart12rt9"
            };
            const req = {
                body: {
                    url: "https://stackoverflow.com", description: "Stackoverflow"
                }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            (urlShortnerService.create).mockRejectedValueOnce(
                {
                    message: "Error Occured"
                }
            );
            // When
            await urlShortner.createShortUrl(req, res);
            expect(res).toBeDefined();
            expect(res.status).toBeCalledWith(400);
            expect(res.json).toBeCalledWith({
                message: "Error",
                data: {},
                error: "Error Occured"
            });
        });
    });

    describe('#getByUniqueId', () => {
        it('should respond with 200 with correct params', async () => {
            // Given
            const urlData = {
                url: "https://stackoverflow.com",
                description: "Stackoverflow",
                id: "ghart12rt9"
            };
            const req = {
                params: {
                    id: "ghart12rt9"
                }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            (urlShortnerService.getById).mockResolvedValueOnce(
                urlData
            );
            // When
            await urlShortner.getByUniqueId(req, res);
            expect(res).toBeDefined();
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith({
                message: "Success",
                data:
                {
                    url: "https://stackoverflow.com",
                    description: "Stackoverflow",
                    id: "ghart12rt9"
                }
            });
        });

        it('should respond with 400 with id missing in params', async () => {
            // Given
            const urlData = {
                url: "https://stackoverflow.com",
                description: "Stackoverflow",
                id: "ghart12rt9"
            };
            const req = {
                params: {
                    id: ""
                }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            (urlShortnerService.getById).mockResolvedValueOnce(
                urlData
            );
            // When
            await urlShortner.getByUniqueId(req, res);
            expect(res).toBeDefined();
            expect(res.status).toBeCalledWith(400);
            expect(res.json).toBeCalledWith({
                message: "Error",
                data: {},
                error: "Unique Id can not be empty"
            });
        });


        it('should respond with 400 with error in payload', async () => {
            // Given
            const urlData = {
                url: "https://stackoverflow.com",
                description: "Stackoverflow",
                id: "ghart12rt9"
            };
            const req = {
                params: {
                    id: "ghart12rt9"
                }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            (urlShortnerService.getById).mockRejectedValueOnce(
                {
                    message: "Error Occured"
                }
            );
            // When
            await urlShortner.getByUniqueId(req, res);
            expect(res).toBeDefined();
            expect(res.status).toBeCalledWith(400);
            expect(res.json).toBeCalledWith({
                message: "Error",
                data: {},
                error: "Error Occured"
            });
        });

        it('should respond with 200 with empty object', async () => {
            // Given
            const urlData = null;
            const req = {
                params: {
                    id: "ghart12rt9"
                }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            (urlShortnerService.getById).mockResolvedValueOnce(
                urlData
            );
            // When
            await urlShortner.getByUniqueId(req, res);
            expect(res).toBeDefined();
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith({
                message: "Success",
                data: {},
                error: "No Url found with unique id ghart12rt9"
            });
        });
    });

    describe('#getAllUrls', () => {
        it('should respond with 200', async () => {
            // Given
            const urlData = [{
                url: "https://stackoverflow.com",
                description: "Stackoverflow",
                id: "ghart12rt9"
            }];
            const req = {
                params: {},
                body: {}
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            (urlShortnerService.getAll).mockResolvedValueOnce(
                urlData
            );
            // When
            await urlShortner.getAllUrls(req, res);
            expect(res).toBeDefined();
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith({
                message: "Success",
                data:
                    [{
                        url: "https://stackoverflow.com",
                        description: "Stackoverflow",
                        id: "ghart12rt9"
                    }]
            });
        });

        it('should respond with 200 with empty array', async () => {
            // Given
            const urlData = [];
            const req = {
                params: {
                    id: ""
                }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            (urlShortnerService.getAll).mockResolvedValueOnce(
                urlData
            );
            // When
            await urlShortner.getAllUrls(req, res);
            expect(res).toBeDefined();
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith({
                message: "Success",
                data: [],
                error: "Empty Store"
            });
        });


        it('should respond with 400 with error', async () => {
            // Given
            const req = {
                params: {
                    id: "ghart12rt9"
                }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            (urlShortnerService.getAll).mockRejectedValueOnce(
                {
                    message: "Error Occured"
                }
            );
            // When
            await urlShortner.getAllUrls(req, res);
            expect(res).toBeDefined();
            expect(res.status).toBeCalledWith(400);
            expect(res.json).toBeCalledWith({
                message: "Error",
                data: [],
                error: "Error Occured"
            });
        });
    });
});