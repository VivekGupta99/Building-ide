const express = require('express');
const path = require('path');
const app = express();
const bodyP = require('body-parser');
app.use(bodyP.json())

const CodeRun = require('./model/codeRun');
const connectDB = require("./db/connect")

const compiler = require('compilex')
const options = { stats: true };
compiler.init(options)

app.use('/codemirror', express.static(path.join(__dirname, 'node_modules', 'codemirror')));

// route to serve HTML
app.get('/', (req, res) => {
    compiler.flush(function () {
        console.log("deleted")
    })
    res.sendFile(path.join(__dirname, 'index.html'));
});

// compiling the code
app.post("/compile", (req, res) => {
    const code = req.body.code;
    const input = req.body.input;
    var lang = req.body.lang;
    try {
        if (lang == "Cpp") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPP(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" })
                    }

                });
            }
            else {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
        else if (lang == "Java") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" })
                    }
                })
            }
            else {
                //if windows  
                var envData = { OS: "windows" };
                //else
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" })
                    }
                })
            }
        }
        else if (lang == "Python") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" })
                    }

                });
            }
            else {
                var envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
    }
    catch (e) {
        console.log("error")
    }

})

async function serverStart() {
    try {
        await connectDB();
        app.listen(3000, () => {
            console.log(`server listening on port 3000...`);
        });
    } catch (error) {
        console.log(error);
    }
}
serverStart();