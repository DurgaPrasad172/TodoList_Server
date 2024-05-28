const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/schema_list");

// Add Task
router.post("/addTask", async (req, res) => {
    try {
        const { title, body, email } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // Create a new list item
            const list = new List({ title, body, user: existingUser._id });
            await list.save();

            // Update the user's schema_list with the new list item
            existingUser.schema_list.push(list._id);
            await existingUser.save();

            res.status(200).json({ list });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get Tasks for a User
router.get("/getTasks/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email }).populate("schema_list");

        if (user) {
            res.status(200).json({ tasks: user.schema_list });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update Task
router.put("/updateTask/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, body } = req.body;

        const updatedTask = await List.findByIdAndUpdate(
            id,
            { title, body },
            { new: true }
        );

        if (updatedTask) {
            res.status(200).json({ task: updatedTask });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Delete Task
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await List.findByIdAndDelete(id);

        if (deletedTask) {
            // Remove the task from the user's schema_list array
            await User.updateOne(
                { _id: deletedTask.user },
                { $pull: { schema_list: id } }
            );

            res.status(200).json({ message: "Task deleted" });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
