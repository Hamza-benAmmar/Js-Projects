const decreaseButton=document.querySelector("#decrease")
const resetButton=document.querySelector("#reset")
const increaseButton=document.querySelector("#increase")
const counter=document.querySelector("#value")
decreaseButton.addEventListener('click',() => {decrease()})
resetButton.addEventListener('click',() => {reset()})
increaseButton.addEventListener('click',() => {increase()})
function decrease(){
    let i=parseInt(counter.innerHTML);
    i--;
    counter.innerHTML=i.toString();
    if(i<0) {counter.style.color="red"}
    else if(i>0) {counter.style.color="green"}
    else if(i==0) {counter.style.color="black"}
}
function increase(){
    let i=parseInt(counter.innerHTML);
    i++;
    counter.innerHTML=i.toString();
    if(i<0) {counter.style.color="red"}
    else if(i>0) {counter.style.color="green"}
    else if(i==0) {counter.style.color="black"}
}
function reset(){
    let i=0;
    counter.innerHTML=i.toString();
    counter.style.color="black"
}