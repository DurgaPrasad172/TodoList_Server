const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    // Reference to lists created by the user
    schema_list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "List", // Reference the List model
    }],
});

module.exports = mongoose.model("User", userSchema);
