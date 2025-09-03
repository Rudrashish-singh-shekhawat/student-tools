let result = document.getElementById("result");
let but = document.getElementById("btn");

function change(){
    result.classList.add("new");
    result.classList.remove("old");
}
but.addEventListener('click',change);