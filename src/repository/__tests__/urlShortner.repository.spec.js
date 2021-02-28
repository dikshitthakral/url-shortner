const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const UrlShortner = require('../../models/urlShortner.model');
const urlShortnerRepository = require('../urlShortner.repository');

jest.mock('mongoose', () => {
    const mongoose = jest.requireActual('mongoose');
    return new mongoose.Mongoose();
});

describe('urlShortner.repository', () => {
    let mongod;
    beforeAll(async () => {
        mongod = new MongoMemoryServer();
        const mongoDbUri = await mongod.getConnectionString();
        await mongoose.connect(mongoDbUri, { useNewUrlParser: true });
    });

    afterEach(async () => {
        await UrlShortner.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongod.stop();
    });

    describe('create', () => {
        it('should not throw error if valid', async () => {
            // Given
            const urlData = {
                url: "https://stackoverflow.com",
                description: "Stackoverflow",
                id: "ghart12rt9"
            }
            // When
            const createdUrl = await urlShortnerRepository.create(urlData);

            // Then
            expect(createdUrl.url).toEqual(urlData.url);
            expect(createdUrl.id).toEqual(urlData.id);
            expect(createdUrl.description).toEqual(urlData.description);
        });

        it('should throw error if not valid', async () => {
            // Given
            const urlData = {
                description: "Stackoverflow",
                id: "ghart12rt9"
            }

            // When
            try {
                await urlShortnerRepository.create(urlData);
            } catch (e) {
                expect(e).toBeDefined();
                expect(e.toString()).toEqual(
                    'ValidationError: url: Path `url` is required.'
                );
            }
        });
    });

    describe('getShortUrlIfExists', () => {
        it('should get url details', async () => {
            // Given
            const urlData = {
                url: "https://stackoverflow.com",
                description: "Stackoverflow",
                id: "ghart12rt9"
            };
            await urlShortnerRepository.create(urlData);

            // When
            const result = await urlShortnerRepository.getShortUrlIfExists(urlData.url);
            // Then
            expect(result.url).toEqual(urlData.url);
            expect(result.id).toEqual(urlData.id);
            expect(result.description).toEqual(urlData.description);
        });

        it('should get null if url does not exists', async () => {
            // Given
            // When
            const result = await urlShortnerRepository.getShortUrlIfExists("https://stackoverflow.com");
            // Then
            expect(result).toEqual(null);
        });
    });

    describe('getById', () => {
        it('should get url details by id', async () => {
            // Given
            const urlData = {
                url: "https://stackoverflow.com",
                description: "Stackoverflow",
                id: "ghart12rt9"
            };
            await urlShortnerRepository.create(urlData);

            // When
            const result = await urlShortnerRepository.getById(urlData.id);
            // Then
            expect(result.url).toEqual(urlData.url);
            expect(result.id).toEqual(urlData.id);
            expect(result.description).toEqual(urlData.description);
        });

        it('should get null if url does not exists', async () => {
            // Given
            // When
            const result = await urlShortnerRepository.getById("ghart12rt9");
            // Then
            expect(result).toEqual(null);
        });
    });

    describe('getAll', () => {
        it('should get all urlDetails', async () => {
            // Given
            const urlData = {
                url: "https://stackoverflow.com",
                description: "Stackoverflow",
                id: "ghart12rt9"
            }
            await urlShortnerRepository.create(urlData);
            await urlShortnerRepository.create({
                url: "https://stackoverflow1.com",
                description: "Stackoverflow1",
                id: "ghart12rt7"
            });
            // When
            const result = await urlShortnerRepository.getAll();
            // Then
            expect(result[0].url).toEqual(urlData.url);
            expect(result[0].id).toEqual(urlData.id);
            expect(result[0].description).toEqual(urlData.description);
        });

        it('should get empty array if urls does not exists', async () => {
            // Given
            // When
            const result = await urlShortnerRepository.getAll();
            // Then
            expect(result).toEqual([]);
        });
    });
})