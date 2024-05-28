const mongoose = require("mongoose");

const conn = async () => {
    try {
        await mongoose.connect("mongodb+srv://u20ec172:4671Sf49@cluster0.jlnimga.mongodb.net/", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected");
    } catch (error) {
        console.error("Not Connected: ", error.message);
        // Handle error appropriately
    }
};

conn();
