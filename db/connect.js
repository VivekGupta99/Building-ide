const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            `mongodb+srv://Vivek1:vivekgupta@cluster0.xpfdemn.mongodb.net/`,
            {
                useNewUrlParser: true, 
            }
        );
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error("error is", error);
    }
};

module.exports = connectDB;
