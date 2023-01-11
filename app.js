const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/",function(req,res){
    
    const firstName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.email
    console.log(firstName, lastName, email)

    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNSME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/342fc199a7"

    const options = {
        method: "POST",
        auth: "suraj1:d9bb8549021151fbc0a0fb4ca12c1dde-us10"
    }

    const request = https.request(url,options,function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html") 

        }
        else{
            res.sendFile(__dirname + "/failure.html")  
        }

        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })

    // request.write(jsonData);
    request.end();

});

console.log("su")

app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
})

// API id 
// d9bb8549021151fbc0a0fb4ca12c1dde-us10

// List id
// 342fc199a7