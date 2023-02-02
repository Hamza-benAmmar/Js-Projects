const searchButton=document.querySelector("#search-btn");
const mealName=document.querySelector("#user-inp");
const result=document.querySelector("#result")
searchButton.addEventListener("click",getRecipe)
function getRecipe(){
    if(mealName.value.length==0){
        result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
    }
    else{
        fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+ mealName.value)
        .then(res=>res.json())
        .then(({meals})=> {return {
            meal:meals[0]
        }})
        .then(({meal})=>{
                return {
                    mealName:meal.strMeal,
                    image:meal.strMealThumb,
                    origin:meal.strArea,
                    recipe:meal.strInstructions,
                    ingredients:parseElements(meal,"strIngredient"),
                    measures:parseElements(meal,"strMeasure")
                }
                
            }
        )
        .then(meal => renderMeal(meal))
        .catch(() => {
            result.innerHTML = `<h3>Invalid Input</h3>`;
          });
    }
}
function parseElements(meal,text){
    {
        var l=[];
        Object.entries(meal).forEach((item)=>{
            if((item[0].includes(text)) && ((item[1]!=="")||(item[1]!==null))){
                l.push(item[1])
            }
        })
        return l.filter(item=>{
             if(item!==null || item!=="") return item 
            })
        
        }
}
function renderMeal(meal){
    const ingredients=meal.ingredients;
    const measures=meal.measures;
    result.innerHTML=`
        <img src=${meal.image}>
        <div class="details">
            <h2>${meal.mealName}</h2>
            <h4>${meal.origin}</h4>
        </div>
        <div id="ingredient-con"></div>
        <div id="recipe">
            <button id="hide-recipe">X</button>
            <pre id="instructions">${meal.recipe}</pre>
        </div>
        <button id="show-recipe">View Recipe</button>
    `
    let ingredientCon = document.getElementById("ingredient-con");
    let parent=document.createElement("ul")
    ingredients.map((item,index)=> {
        let ingredient=document.createElement("li")
        ingredient.innerHTML=`
            ${item} : ${measures[index]}
        `
        parent.appendChild(ingredient)
        ingredientCon.appendChild(parent)
    })
    const showRecipe=document.querySelector("#show-recipe")
    const hideRecipe=document.querySelector("#hide-recipe")
    hideRecipe.addEventListener("click", () => {
        recipe.style.display = "none";
      });
    showRecipe.addEventListener("click", () => {
        recipe.style.display = "block";
      });
    mealName.value=""
}