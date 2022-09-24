const express = require("express");
const app = express();
const port = (process.env.PORT || 5000);
const request = require("request");
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.listen(port,function(){
    console.log("Server is runing on port 3000");
})

app.get("/",function (req,res) {
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",function (req,res) {
    const email= req.body.mail;
    const lastName = req.body.last;
    const firstName =req.body.first;
    const data = {
        members: [
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }

            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url ="https://us8.api.mailchimp.com/3.0/lists/5cb482f3a4";
    const options ={
        method:"POST",
        auth:"Rahul1:467df79f4483ec069c65b0103373890c-us8"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
        })
    })
    request.write(jsonData);
    request.end();
})
app.post("/failure",function (req,res) {
    res.redirect("/");
})
// 467df79f4483ec069c65b0103373890c-us8