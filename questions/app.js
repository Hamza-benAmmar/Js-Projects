//using selectors inside the element
// traversing the dom
const buttons=document.querySelectorAll(".question-btn")
const questions=document.querySelectorAll(".question")
console.log(buttons)
buttons.forEach(function(btn){
    btn.addEventListener('click',function(e){
       const question=e.currentTarget.parentElement.parentElement;
       question.classList.toggle("show-text") 
       questions.forEach(function(quest){
        if(quest!=question){
            quest.classList.remove("show-text")
        }
       })
    })
})