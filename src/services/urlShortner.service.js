const validUrl = require("valid-url");
const { nanoid } = require("nanoid");
const urlShortnerRepository = require("../repository/urlShortner.repository");

const create = async (params) => {
    const { url, description } = params;
    if (!validUrl.isUri(url)) {
        throw { message: "Invalid URL. Please enter a vlaid url for shortening.Url is invalid" };
    }
    try {
        let result;
        const oldUrl = await urlShortnerRepository.getShortUrlIfExists(url);
        if (oldUrl) {
            result = oldUrl;
        } else {
            const id = nanoid(10);
            result = await urlShortnerRepository.create({
                url,
                description,
                id
            });
        }
        return {
            url: result.url,
            description: result.description,
            id: result.id
        }
    }
    catch (error) {
        throw error;
    }
};

const getById = async (id) => {
    try {
        const result = await urlShortnerRepository.getById(id);
        if (!result) {
            return null;
        }
        return {
            url: result.url,
            description: result.description,
            id: result.id
        }
    }
    catch (error) {
        throw error;
    }
}

const getAll = async () => {
    try {
        const urls = await urlShortnerRepository.getAll();
        if (!urls || urls.length === 0) {
            return [];
        }
        let result = [];
        for (let url of urls) {
            result.push({
                id: url.id,
                url: url.url,
                description: url.description
            });
        }
        return result;
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    create,
    getById,
    getAll
}