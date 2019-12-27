let express = require("express");
let app = express();
let bodyParser = require("body-parser");

let fir_field;
let sec_field;

let first_count = 0;
let second_count = 0;
let turn = 0;

let date_start;
let start_min;
let end_min;
let winner = 0;
let player_count = 0;
let ready_pl = 0;
let urlencodedParser = bodyParser.urlencoded({extended: true});

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/index.html",function(request, response){
    //player_count++;
    console.log(player_count + " count");
    response.sendFile(__dirname + "/index.html");
});

app.post("/index.html", urlencodedParser, function(req, res) {
    return res.send(String(player_count));
});

app.post("/game_count", urlencodedParser, function(req, res) {
    console.log("cliked");
    player_count++;
});

app.post("/start_the_game", urlencodedParser, function(req, res) {
    ready_pl++;
    console.log(ready_pl + " ready ");
    if(ready_pl == 1){
        fir_field = req.body;
        console.log(fir_field);
        for(let it = 0; it < 100; it++)
            if(fir_field[it] == 2) first_count++;

        console.log("first count: " + first_count);
    }
    if(ready_pl == 2){
        date_start = new Date().toISOString().slice(0, 19).replace('T', ' ');
        console.log(date_start);
        start_min = new Date().getMinutes();
        console.log( "start min: " + start_min);
        turn = 1;
        sec_field = req.body;
        console.log(sec_field);
        for(let it = 0; it < 100; it++)
            if(sec_field[it] == 2) second_count++;
                
        console.log("second count: " + second_count);
    }
    return res.send(String(ready_pl));
});

let tmp = {
    x: -1,
    y: -1,
    move: 1,
    winc: 0,
    confirm: 0
  };

app.post("/rquit", urlencodedParser, function(req, res) {
    ready_pl = 0;
    turn = 0;
    first_count = 0;
    second_count = 0;
    player_count = 0;
    tmp.winc = 0;
    tmp.move = 1;
    winner = 0;
    console.log("restart");
});

app.post("/fire", urlencodedParser, function(req, res) {
    pr = req.body;
    console.log(JSON.stringify(pr));
    if(turn != pr.move){
        tmp.confirm = -1;
        res.json(tmp);
    } else if(turn == 1 || turn == 2){    
        let x_i = pr.x;
        let y_i = pr.y;
        if(turn == 1){
            let ind = parseInt(x_i * 10) + parseInt(y_i);
            if(sec_field[ind] == 2){
                console.log("1 player hit at " + x_i + y_i);
                sec_field[ind] = 3;
                tmp.confirm = 1;
                second_count--;
                if(second_count == 0){
                    tmp.winc = 1;
                    winner = 1;
                    end_min = new Date().getMinutes();  
                    let sql1 = "INSERT INTO history(player_name, date, duration)";
                    sql1 +=   "VALUES('" + winner + " player','" + date_start + "', '" + Math.abs(parseInt(end_min) - parseInt(start_min)) + "');";
                    console.log(sql1);
                    con.query(sql1, function(err, results) {
                        if (err) throw err;
                        console.log("Insert copmlete");
                    });
                }
            } else if(sec_field[ind] == 0){
                console.log("1 player missed " + x_i + y_i);
                sec_field[ind] = 1;
                turn = 2;
                tmp.confirm = 0;
            } else {
                console.log("smh 1");
                tmp.confirm = -1;
            }
        } else if(turn == 2){
            let ind = parseInt(x_i * 10) + parseInt(y_i);
            if(fir_field[ind] == 2){
                console.log("2 player hit at " + x_i + y_i);
                fir_field[ind] = 3;
                tmp.confirm = 1;
                first_count--;
                if(first_count == 0){
                    tmp.winc = 1;
                    winner = 2;
                    end_min = new Date().getMinutes();  
                    let sql1 = "INSERT INTO history(player_name, date, duration)";
                    sql1 +=   "VALUES('" + winner + " player','" + date_start + "', '" + Math.abs(parseInt(end_min) - parseInt(start_min)) + "');";
                    console.log(sql1);
                    con.query(sql1, function(err, results) {
                        if (err) throw err;
                        console.log("Insert copmlete");
                    });
                }
            } else if(fir_field[ind] == 0){
                console.log("2 player missed " + x_i + y_i);
                fir_field[ind] = 1;
                turn = 1;
                tmp.confirm = 0;
            } else {
                console.log("smh 1");
                tmp.confirm = -1;
                end_min = new Date().getMinutes();
            }
        }
        res.json(tmp);
    }
});

app.get("/database",function(request, response)
{
    con.query("SELECT * FROM mydb.history", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        response.setHeader("UserId", 12);
        response.setHeader("Content-Type", "text/html; charset=utf-8;");
        console.log(JSON.stringify(result));
        response.write(JSON.stringify(result));
        response.end();
      });
});

app.listen(3000);

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "mydb"
});

con.connect(function(err) {
     if (err) throw err;
     console.log("Connected!");
  });

