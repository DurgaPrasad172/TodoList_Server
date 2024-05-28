const express=require("express");
const app=express();
require("./Connection/conn");
const auth=require("./routes/auth")
const tasklist=require("./routes/listitems")
const cors = require('cors');

app.use(express.json());
const PORT = process.env.PORT ||3000;
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Hello");
})

app.use("/api",auth);
app.use("/api/tasks",tasklist);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  