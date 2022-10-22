const empty = document.querySelector(".main__empty");
const taskLinks = document.querySelector(".main__tasks");
const deleteBtn = document.querySelector(".main__tasks-list__delete");


const form = document.querySelector(".main__form");
const completedList = document.querySelector(".list__complete");

const checkEmpty = () => {
    if (taskLinks.children.length > 0) {
        empty.classList.add("empty");
    } else {
        empty.classList.remove("empty");
    }
}

const generateUniqueId = (input) => {
    return Math.random().toString(36).substring(2, 2 + input);
}

const makeListElement = (inputValue) => {
    const uniqueId = generateUniqueId(10);
    const taskList = document.createElement("li");
    taskList.classList.add("main__tasks-list");
    taskList.innerHTML = `
        <input type="checkbox" name="new-task" id="${uniqueId}" class="main__tasks-list__check">
        <input type="text" class="main__tasks-list__name" value="${inputValue}" disabled></input>
        <div >
            <button class="main__tasks-list__edit btn">
                <img class="edit__img" width="20" height="20" src="/assets/edit-icon.svg" alt="edit icon">
            </button>
            <button class="main__tasks-list__delete btn">
                <img class="delete__img" width="20" height="20" src="/assets/trash-icon.svg" alt="delete icon">
            </button> 
        </div>
    `;
    return taskList;
}

//add
form.addEventListener("submit", (e) => {
    e.preventDefault();

    //get the input value
    const newTask = document.querySelector("#newTask");
    const inputValue = newTask.value;

    //clear the input value after submit
    newTask.value = "";

    //add focus on the input field;
    newTask.focus();

    //check the input value, if empty exit the submit event listeners
    if (!inputValue) return;

    const makeElement = makeListElement(inputValue);

    taskLinks.appendChild(makeElement);

    checkEmpty();




});


//edit
document.addEventListener("click", (e) => {

    if (e.target.matches('.main__tasks-list__edit') || e.target.matches('.edit__img')) {
        listItem = e.target.parentNode.previousSibling.previousSibling;
        if (listItem.disabled) {
            listItem.disabled = false;

            listItem.addEventListener("blur", (e) => {
                listItem.disabled = true;
            })
        }
    }
})


//delete
document.addEventListener("click", (e) => {
    if (e.target.matches('.main__tasks-list__delete') || e.target.matches('.delete__img')) {
        (e.target.closest("li")).remove();
        checkEmpty();
    }
});


//check

document.addEventListener("click", (e) => {
    if (e.target.matches('.main__tasks-list__check')) {
        listCompleted();
        checkEmpty();
    }
});


//check the checked item
const listCompleted = () => {

    if (taskLinks.children) {
        for (tl of taskLinks.children) {
            if (tl.children[0].checked) {
                completedList.appendChild(tl);
                tl.children[2].children[0].classList.add("empty");
            }
        }
    }

    if (completedList.children) {
        for (cl of completedList.children) {
            if (!cl.children[0].checked) {
                taskLinks.appendChild(cl);
                cl.children[2].children[0].classList.remove("empty");
            }
        }

    }

}