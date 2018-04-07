var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.send("Enter Something after / in URL");
})

app.get("/:dateString", function(req,res){
    // res.send(req.params.dateString);
    let date = req.params.dateString;
    if (! isNaN(date)) {
        date = Number(date*1000);
    }
    const possibleDate = new Date(date);
    const locale = "en-us";

    if (possibleDate=="Invalid Date") {
        return res.send("Invalid Date");
    }
    // console.log(possibleDate.toLocaleString(locale, {month: "long"}) , possibleDate.getDate() , possibleDate.getFullYear());
    const dateObject = {
        "unix": Math.round(possibleDate.getTime()/1000),
        "natural": possibleDate.toLocaleString(locale, { month: "long" }) + " " + possibleDate.getDate() + " , " + possibleDate.getFullYear()
    }
    res.send(JSON.stringify(dateObject));
});

app.listen(8000, function() {
    console.log("Started Server at 8000");
})

