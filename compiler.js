const compiler = require('compilex');

compiler.init({ stats: true });

async function compileCode(lang, code) {
    return new Promise((resolve, reject) => {
        let envData = { OS: "windows" };
        let compileFunction;

        switch (lang) {
            case "Cpp":
                compileFunction = compiler.compileCPP;
                break;
            case "Java":
                compileFunction = compiler.compileJava;
                break;
            case "Python":
                compileFunction = compiler.compilePython;
                break;
            default:
                reject(new Error("Unsupported language"));
                return;
        }

        compileFunction(envData, code, function (data) {
            if (data.output) {
                resolve(data);
            } else {
                reject(new Error("Compilation failed"));
            }
        });
    });
}

async function compileCodeWithInput(lang, code, input) {
    return new Promise((resolve, reject) => {
        let envData = { OS: "windows" };
        let compileFunction;

        switch (lang) {
            case "Cpp":
                compileFunction = compiler.compileCPPWithInput;
                break;
            case "Java":
                compileFunction = compiler.compileJavaWithInput;
                break;
            case "Python":
                compileFunction = compiler.compilePythonWithInput;
                break;
            default:
                reject(new Error("Unsupported language"));
                return;
        }

        compileFunction(envData, code, input, function (data) {
            if (data.output) {
                resolve(data);
            } else {
                reject(new Error("Compilation failed"));
            }
        });
    });
}

module.exports = { compileCode, compileCodeWithInput };
