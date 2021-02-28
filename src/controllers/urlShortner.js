const urlShortnerService = require("../services/urlShortner.service");

const createShortUrl = async (req, res) => {
    const { url, description } = req.body;

    if (!url) {
        return res.status(400).json({
            message: "Error",
            data: {},
            error: "Url cannot be empty"
        })
    }
    return urlShortnerService.create({ url, description })
        .then((response) => {
            res.status(201).json({
                message: 'Success',
                data: response
            });
        }).catch(err => {
            res.status(400).json({
                message: 'Error',
                data: {},
                error: err.message || 'Error occured while creating the short url.'
            });
        });
};

const getByUniqueId = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            message: "Error",
            data: {},
            error: "Unique Id can not be empty"
        });
    }
    return urlShortnerService.getById(req.params.id)
        .then((response) => {
            if (!response) {
                return res.status(200).json({
                    message: "Success",
                    data: {},
                    error: "No Url found with unique id " + req.params.id
                })
            }
            return res.status(200).json({
                message: 'Success',
                data: response
            });
        }).catch(err => {
            return res.status(400).json({
                message: 'Error',
                data: {},
                error: err && err.message || 'Some Error Occured while retriving Url.'
            });
        });
};

const getAllUrls = async (req, res) => {
    return urlShortnerService.getAll()
        .then((response) => {
            if (!response || response.length === 0) {
                return res.status(200).json({
                    message: "Success",
                    data: [],
                    error: "Empty Store"
                })
            }
            return res.status(200).json({
                message: 'Success',
                data: response
            });
        }).catch(err => {
            return res.status(400).json({
                message: 'Error',
                data: [],
                error: err && err.message || 'Some Error Occured while retriving Url.'
            });
        });
};

module.exports = {
    createShortUrl,
    getByUniqueId,
    getAllUrls
}