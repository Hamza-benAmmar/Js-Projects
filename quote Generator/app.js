function getQuote (){
    return fetch("https://api.quotable.io/random")
        .then(response => response.json())
        .then(renderQuote)
}    
const author=document.querySelector("#author")
const generateQuoteButton=document.querySelector("#btn")
const quoteContent=document.querySelector("#quote")
window.addEventListener("load",getQuote)
generateQuoteButton.addEventListener("click",getQuote)
function renderQuote(data){
    author.textContent=data.author;
    quoteContent.textContent=data.content;
}