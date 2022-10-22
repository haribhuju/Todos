const empty = document.querySelector(".main__empty");
const taskLinks = document.querySelector(".main__tasks");
const deleteBtn = document.querySelector(".main__tasks-list__delete")

const form = document.querySelector(".main__form");

const checkEmpty = () => {  
  (taskLinks.children.length > 0) ? empty.classList.add("empty") : empty.classList.remove("empty");;
}

const generateUniqueId = (input) =>{
    return Math.random().toString(36).substring(2, 2 + input);
}

const makeListElement = (inputValue) =>{
    const uniqueId = generateUniqueId(10);
    const taskList = document.createElement("li");
    taskList.classList.add("main__tasks-list");
    taskList.innerHTML = `
        <input type="checkbox" name="new-task" id="${uniqueId}">
        <span class="main__tasks-list__name">${inputValue}</span>
        <button class="main__tasks-list__delete btn">
            <img class="delete__img" width="20" height="20" src="/assets/trash-icon.svg" alt="delete icon">
        </button>
    `;
    return taskList;
}

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    
    //get the input value
    const newTask = document.querySelector("#newTask");
    const inputValue = newTask.value;

    //clear the input value after submit
    newTask.value = "";

    //add focus on the input field;
    newTask.focus();

    //check the input value, if empty exit the submit event listeners
    if(!inputValue) return;

    const makeElement = makeListElement(inputValue);

    taskLinks.appendChild(makeElement);
    checkEmpty();
});

document.addEventListener("click", (e) => {
    if(e.target.matches('.btn') || e.target.matches('.delete__img')) {
        (e.target.closest("li")).remove();
        checkEmpty(); 
    } 
  
});

