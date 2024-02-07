const mongoose = require("mongoose");
const codeRunSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    input: {
        type: String,
    },
    lang: {
        type: String,
        required: true
    },
    output: {
        type: String,
    }
});

module.exports = mongoose.model("codeRun", codeRunSchema);