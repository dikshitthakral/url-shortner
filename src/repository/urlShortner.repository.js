const UrlShortner = require('../models/urlShortner.model');

const getShortUrlIfExists = async (url) =>
    UrlShortner.findOne({ url: url });

const create = async (data) => {
    const newUrl = new UrlShortner({
        url: data.url,
        description: data.description,
        id: data.id
    });
    return newUrl.save();
}

const getById = async (id) => UrlShortner.findOne({ id: id });

const getAll = async () => UrlShortner.find();

module.exports = {
    getShortUrlIfExists,
    create,
    getById,
    getAll
}