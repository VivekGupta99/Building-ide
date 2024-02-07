const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const compiler = require('compilex');
const { compileCode, compileCodeWithInput } = require('./compiler');
const connectDB = require("./db/connect");
const CodeRun = require("./model/codeRun")

app.use(bodyParser.json());

compiler.init({ stats: true });

app.use('/codemirror', express.static(path.join(__dirname, 'node_modules', 'codemirror')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post("/compile", async (req, res) => {
    const { code, input, lang } = req.body;
    try {
        let result;
        if (!input) {
            result = await compileCode(lang, code);
        } else {
            result = await compileCodeWithInput(lang, code, input);
        }

        // Create a new instance of CodeRun model
        const newCodeRun = new CodeRun({
            code: code,
            input: input,
            lang: lang,
            output: result.output
        });

        // Save the new code run to the database
        await newCodeRun.save();

        res.send(result);
    } catch (error) {
        console.error("Compilation Error:", error);
        res.status(500).send({ output: "error", error: error.message });
    }
});

app.get("/submitted-code", async (req, res) => {
    try {
        const submittedCode = await CodeRun.find().exec(); // Fetch only the code field from the database
        res.json(submittedCode);
        
    } catch (error) {
        console.error("Error fetching submitted code:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

async function serverStart() {
    try {
        await connectDB();
        app.listen(3000, () => {
            console.log(`Server listening on port 3000...`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

serverStart();
