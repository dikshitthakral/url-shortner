const urlShortnerRepository = require('../../repository/urlShortner.repository');
const urlShortnerService = require('../urlShortner.service');
const validUrl = require("valid-url");

jest.mock('../../repository/urlShortner.repository');
jest.mock('nanoid', () => ({ nanoid: () => 'ghart12rt9' }));
jest.mock("valid-url");

describe('url shortner service', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('#create', () => {
        it('should create url data succesfully', async () => {
            // Given
            const urlData = {
                url: "https://stackoverflow.com",
                description: "Stackoverflow",
                id: "ghart12rt9"
            };
            (validUrl.isUri).mockReturnValueOnce(true);
            (urlShortnerRepository.create).mockResolvedValueOnce(
                urlData
            );
            (urlShortnerRepository.getShortUrlIfExists).mockResolvedValueOnce(null);

            // When
            const result = await urlShortnerService.create(urlData);
            expect(result).toBeDefined();

        });

        it('should throw error when url is not valid', async () => {
            // Given
            const urlData = {
                url: "https://stackoverflow.com",
                description: "Stackoverflow",
                id: "ghart12rt9"
            };
            (validUrl.isUri).mockReturnValueOnce(false);
            // When
            try {
                await urlShortnerService.create(urlData);
            }
            catch (err) {
                expect(err).toBeDefined();
                expect(err.message).toEqual('Invalid URL. Please enter a vlaid url for shortening.Url is invalid');
            }
            expect(urlShortnerRepository.create).not.toHaveBeenCalled();
            expect(urlShortnerRepository.getShortUrlIfExists).not.toHaveBeenCalled();
        });

        it('should throw error when create url data', async () => {
            // Given
            const urlData = {
                url: "https://stackoverflow.com",
                description: "Stackoverflow",
                id: "ghart12rt9"
            };
            (validUrl.isUri).mockReturnValueOnce(true);
            (urlShortnerRepository.create).mockRejectedValueOnce(
                { message: "Error Occured" }
            );
            (urlShortnerRepository.getShortUrlIfExists).mockResolvedValueOnce(null);

            // When
            try {
                await urlShortnerService.create(urlData);
            }
            catch (err) {
                expect(err).toBeDefined();
                expect(err.message).toEqual("Error Occured");
            }
        });
    });

    describe('#getById', () => {
        it('should get url details by id', async () => {
            // Given
            const urlData = {
                url: "https://stackoverflow.com",
                description: "Stackoverflow",
                id: "ghart12rt9"
            };
            (urlShortnerRepository.getById).mockResolvedValueOnce(
                urlData
            );

            // When
            const result = await urlShortnerService.getById(urlData.id);
            // Then
            expect(result.url).toEqual(urlData.url);
            expect(result.id).toEqual(urlData.id);
            expect(result.description).toEqual(urlData.description);
        });

        it('should get null if url does not exists', async () => {
            // Given
            (urlShortnerRepository.getById).mockResolvedValueOnce(
                null
            );
            // When
            const result = await urlShortnerService.getById("ghart12rt9");
            // Then
            expect(result).toEqual(null);
        });
    });

    describe('#getAll', () => {
        it('should get list of url details', async () => {
            // Given
            const urlData = [{
                url: "https://stackoverflow.com",
                description: "Stackoverflow",
                id: "ghart12rt9"
            }, {
                url: "https://stackoverflow1.com",
                description: "Stackoverflow1",
                id: "ghart12rt8"
            }];
            (urlShortnerRepository.getAll).mockResolvedValueOnce(
                urlData
            );

            // When
            const result = await urlShortnerService.getAll();
            // Then
            expect(result.length).toEqual(2);
            expect(result[0].url).toEqual(urlData[0].url);
            expect(result[0].id).toEqual(urlData[0].id);
            expect(result[0].description).toEqual(urlData[0].description);
        });

        it('should get null if url does not exists', async () => {
            // Given
            (urlShortnerRepository.getById).mockResolvedValueOnce(
                []
            );
            // When
            const result = await urlShortnerService.getAll();
            // Then
            expect(result).toEqual([]);
        });
    });
});