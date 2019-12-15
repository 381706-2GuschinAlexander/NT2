function CreateTable(number){
    var x = document.createElement("TABLE");
    x.setAttribute("id", "myTable" + number);
    x.style.width = "300px";
    x.style.height = "300px";
    document.body.appendChild(x);

  for(var i = 0; i  < 10; ++i){
    var y = document.createElement("TR");
    y.setAttribute("id", "myTr" + i + number * 10);
    document.getElementById("myTable" + number).appendChild(y);
    for(var k = 0; k < 10; ++k){
        var z = document.createElement("TD");
        var t = document.createElement("A");
        t.setAttribute("id", "node" + (number * 100 + i * 10 + k));
        t.innerHTML = "0";
        t.onclick = CanPlace(this);
        z.appendChild(t);
        document.getElementById("myTr" + i + number * 10).appendChild(z);
      }
    }

}

function CreateField(){
  var removeElem = document.getElementById("start button");
    removeElem.parentNode.removeChild(removeElem);
    CreateTable(0);
    CreateTable(1);
}

function Set(is_placment, obj)
{
  CanPlace(obj);
}

function CanPlace(obj)
{
  if(obj.innerHTML == 'x')
    obj.innerHTML = '0';
  else
    obj.innerHTML = 'x';

}

