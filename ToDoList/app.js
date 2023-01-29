const form=document.querySelector(".toDoList-form")
const submitBtn=document.querySelector(".submit-btn")
const alert=document.querySelector(".alert")
const itemTodo=document.querySelector("#itemTodo")
const list=document.querySelector(".toDoList-list")
const container=document.querySelector(".toDoList-container")
const clearBtn=document.querySelector(".clear-btn")

form.addEventListener("submit",addItem)
clearBtn.addEventListener("click",clearItems)

// *******variables********
let editFlag=false;
let editElement;
let editID = "";
// *********FUNCTIONS*********
function addItem(e){
    e.preventDefault();
    const value=itemTodo.value;
    const id=new Date().getTime().toString();
    if(value && !editFlag){
        var element=document.createElement("article")
        element.classList.add('toDoList-item');
        let ID=document.createAttribute("data-id");
        ID.value=id;
        element.setAttributeNode(ID);
        element.innerHTML=`
            <p class="title">${value}</p>
            <div class="btn-container">
                    <button class="edit-btn">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
            </div>
        `
        list.appendChild(element);
        const editBtn=element.querySelector(".edit-btn")
        const deleteBtn=element.querySelector(".delete-btn")
        editBtn.addEventListener("click",editItem)
        deleteBtn.addEventListener("click",deleteItem)
        displayAlert("Item added successfully","success")
        container.classList.add("show-container")
        addToLocalStorage(id,value)
        setBackToDefault()
    }else if (value && editFlag){
        editElement.innerHTML=value;
        displayAlert("item changed","success")
        editLocalStorage(editID,value) 
        setBackToDefault()
    }else{
        displayAlert("please, enter an item to your toDoList","danger")
    }
}

function displayAlert(text,action){
    alert.textContent=text;
    alert.classList.add(`alert-${action}`)
    setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

function clearItems(){
    const items=document.querySelectorAll(".toDoList-item")
    if (items.length > 0){
        items.forEach(function(item){
            list.removeChild(item);
        })
    }
    container.classList.remove("show-container")
    displayAlert("toDoList Cleared ! ","success")
    localStorage.removeItem("list");
}

function setBackToDefault(){
    itemTodo.value="";
    editFlag=false;
    editID="";
    submitBtn.textContent="submit";
}

function deleteItem(e){
    const element=e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element)
    const items=document.querySelectorAll('.toDoList-item')
    if (items.length===0){
        container.classList.remove("show-container")
    }
    displayAlert("item deleted ! ","success")
    removeFromLocalStorage(id)
    setBackToDefault()
}
function editItem(e){
    const element=e.currentTarget.parentElement.parentElement;
    editElement=e.currentTarget.parentElement.previousElementSibling;
    itemTodo.value=editElement.innerHTML;
    submitBtn.textContent="edit";
    editID=element.dataset.id;
    editFlag=true;
}
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });

  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();

  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}