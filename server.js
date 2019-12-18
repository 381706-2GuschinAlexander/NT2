let express = require("express");
let app = express();
let bodyParser = require("body-parser");

let player_count = 0;
let ready_pl = 0;
let urlencodedParser = bodyParser.urlencoded({extended: true});

app.use(express.static("public"));

app.get("/index.html",function(request, response){
    player_count++;
    console.log(player_count + "count");
    response.sendFile(__dirname + "/index.html");
});

app.post("/index.html", urlencodedParser, function(req, res) {
    return res.send(String(player_count));
});

app.get("/game.html",function(request, response){
    let a = request
});


// app.get("/",function(request, response){
    
// });

app.listen(3000);

app.use(bodyParser.json());


/*app.post('/index.html', urlencodedParser, function(req, res) {
    
    return res.json(request);
});*/