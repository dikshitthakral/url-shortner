const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    url: { type: String, required: true },
    description: { type: String, required: false },
    id: { type: String, required: true },
});

module.exports = mongoose.model("urlShortner", urlSchema);
