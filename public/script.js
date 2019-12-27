
let lock = 0;

let player_number = 0;

let ship_segments = 0;


let cord_inc = [];
for(let i = 0; i < 100; ++i)
  cord_inc.push(0);

function CreateTable(number){
    let x = document.createElement("TABLE");
    x.setAttribute("id", "Table" + number);
    x.style.width = "300px";
    x.style.height = "300px";
    document.body.appendChild(x);

  for(let i = 0; i  < 10; ++i){
    let y = document.createElement("TR");
    y.setAttribute("id", "tr" + (i + number * 10));
    document.getElementById("Table" + number).appendChild(y);
    for(let k = 0; k < 10; ++k){
        let z = document.createElement("TD");
        z.innerHTML = '0';
        z.setAttribute("id", "td" + number + i + k)
        document.getElementById("tr" + (i + number * 10)).appendChild(z);
      }
    }

    if(number == 0) {
      x.onclick = function(event) {
        if(lock == 1)
          return;
        let td = event.target.closest('td');
        if (!td)
            return;
        let curr_id = td.getAttribute("id");
        if(td.innerHTML != 'x'){
          ship_segments++;       
          td.innerHTML = 'x';
        }
        let x = curr_id[3];
        let y = curr_id[4];
        console.log(x + " " + y + " ");
        let ind = parseInt(x * 10) + parseInt(y);
        console.log(ind);
        cord_inc[ind] = 2;
      } 
    } else {
      x.onclick = function(event){
        if(lock == 0)
          return;
        let td = event.target.closest('td');
        if (!td)
          return;
        let curr_id = td.getAttribute("id");
        let x = curr_id[3];
        let y = curr_id[4];
        console.log(x + " " + y + " ");
        let ind = parseInt(x * 10) + parseInt(y);
        console.log(ind);
        Fire(x, y);
      }
    }
}


function CreateField(){
    CreateTable(1);
    CreateTable(0);
}



function Start(){
  lock = 1;
  document.getElementById("btn_rd").hidden = true;
  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://127.0.0.1:3000/start_the_game", true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      player_number = parseInt(this.response);
      alert("You are " + player_number + " player");
    }
  }
  xhttp.setRequestHeader("Content-Type", "application/json"); 
  console.log(JSON.stringify(cord_inc));
  xhttp.send(JSON.stringify(cord_inc));

}

function RQuit(){
  if(lock != 1)
    return;

  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://127.0.0.1:3000/rquit", true);
  xhttp.send();
}

let packet = {
  x: -1,
  y: -1,
  move: 1,
  winc: 0,
  confirm: 0
};

function Fire(x_i, y_i){
  let xhttp = new XMLHttpRequest();
  let recv;
  xhttp.open("POST", "http://127.0.0.1:3000/fire", true);
  xhttp.setRequestHeader("Content-Type", "application/json"); 
  xhttp.responseType = 'json';
  packet.x = x_i;
  packet.y = y_i;
  packet.move = player_number;
  xhttp.send(JSON.stringify(packet));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("reciving...");
      recv = this.response;
      console.log(recv);
      if(recv.confirm == 0)
        document.getElementById("td1" + x_i + y_i).innerHTML = "^";
      if(recv.confirm == 1)
        document.getElementById("td1" + x_i + y_i).innerHTML = "*";
      if(recv.winc == 1 && recv.confirm != 1)
        alert("2nd place");
      else if(recv.winc == 1)
        alert("Сongratulations! You did it!");

    }
  }
  //UpdateT();
}

// function UpdateT(){
//   if(lock != 1)
//     return;
//   else{
//     let xhttp = new XMLHttpRequest();
//     xhttp.open("POST", "http://127.0.0.1:3000/get_update", true);
//     xhttp.onreadystatechange = function() {
//      if (this.readyState == 4 && this.status == 200) {
//         console.log("update...")
//         let arr = this.response;
//         if(arr[0] == 7){
//          clearTimeout(timerId);
//           alert("2nd place!");
//         } 
//         for(let it = 0; it < 100; it++){
//           if(arr[it] == 0)
//             document.getElementById("td");
//       }
//     }
//   } 
//   xhttp.setRequestHeader("Content-Type", "application/json"); 
//   xhttp.responseType = 'json';
//   console.log((JSON.stringify(player_number)));
//   xhttp.send((JSON.stringify(player_number)));
// }
// }

// let upd = UpdateT();

// let timerId = setInterval(() => UpdateT(), 5000);

