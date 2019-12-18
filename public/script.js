
let is_started = 0;

let player_number = 0;

let ship_segments = 0;

let n = 4, m = 4;
let field1 = [[],[]];
for (let i = 0; i < m; i++){
    field1[i] = [];
    for (let j = 0; j < n; j++){
        field1[i][j] = 0;
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
    y.setAttribute("id", "myTr" + i + number * 10);
    document.getElementById("Table" + number).appendChild(y);
    for(let k = 0; k < 10; ++k){
        let z = document.createElement("TD");
        z.innerHTML = '0';
        document.getElementById("myTr" + i + number * 10).appendChild(z);
      }
    }

    if(number == 0) {
      x.onclick = function(event) {
        if(is_started == 1)
          return;
        let td = event.target.closest('td');
        if (!td)
            return;
        //let curr_id = td.getAttribute("id");
        if(td.innerHTML != 'x'){
          ship_segments++;       
          td.innerHTML = 'x';
        }
      } 
    } else {
      x.onclick = function(event){
        if(is_started == 0)
          return;
      }
    }
}


function CreateField(){
    CreateTable(1);
    CreateTable(0);
}


