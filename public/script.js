
let is_started = 0;

let player_number = 0;

let ship_segments = 0;

let n = 10, m = 10;
let field = [[],[]];
for (let i = 0; i < m; i++){
    field[i] = [];
    for (let j = 0; j < n; j++){
        field[i][j] = 0;
    }
}


function getNum(){
  player_number = 1;
}

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
        if(is_started == 1)
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
        let y = curr_if[4];
        console.log(x + " " + y + " ");
        field[x][y] = 1;
      } 
    } else {
      x.onclick = function(event){
        if(is_started == 0)
          return;
        let td = event.target.closest('td');
        if (!td)
          return;
        let curr_id = td.getAttribute("id");
        let x = curr_id[3];
        let y = curr_id[4];

        let xhttp = XMLHttpRequest();
      }
    }
}


function CreateField(){
    CreateTable(1);
    CreateTable(0);
}


