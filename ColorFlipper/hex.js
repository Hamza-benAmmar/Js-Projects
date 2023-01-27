const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const ClickButton=document.querySelector("#btn");
const container=document.querySelector("main");
const backgroundColor=document.querySelector(".color");

ClickButton.addEventListener('click', function (e) {
    console.log(e);
    backgroundColor.innerHTML=randomColor();
    container.style.backgroundColor=randomColor();
})
function randomColor(){
    let color="#";
    for(let i=0;i<6;i++){
        color+=hex[Math.floor(Math.random()*hex.length)];
    }
    return color;
}
