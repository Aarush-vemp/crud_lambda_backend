const serverless = require("serverless-http");
const express = require("express");
const initUserTable = require("./Models/UserModel");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("ping connected");
})
app.post("/registerUser", async (req, res) => {
    const createUser = await initUserTable();
    const userData = req.body;
    try{
        const user = await createUser.findOne({
            where : {
                email : userData.email 
            }
        })
        if(user === null) {
            const createdUser = await createUser.create(userData);
            res.status(200).send({success : true});
        }else{
            res.status(409).send({userAlreadyExists : true})
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).send({success:false});
    }
})

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);