// classList - shows/gets all classes
// contains - checks classList for specific class
// add - add class
// remove - remove class
// toggle - toggles class
const icon=document.querySelector(".nav-toggle")
const mainLinks=document.querySelector(".links")
icon.addEventListener('click',function (){
    mainLinks.classList.toggle("show-links")
})