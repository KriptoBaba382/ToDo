const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");
const todoRemove = document.querySelector(".todo-remove");

let toDoData = JSON.parse(localStorage.getItem("toDoData-local"));
if (toDoData === null) {
    toDoData = []
}
console.log(toDoData)
const render = function () {
    todoList.innerHTML = "";
    todoCompleted.innerHTML = "";

    toDoData.forEach(function (item) {
        const li = document.createElement("li");

        li.classList.add("todo-item");

        li.innerHTML =
            '<span class="text-todo">' +
            item.text +
            "</span>" +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            "</div>";
        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
        li.querySelector(".todo-complete").addEventListener("click", function () {
            item.completed = !item.completed;
            localStorage.setItem("toDoData-local", JSON.stringify(toDoData));
            render();
        });
        li.querySelector(".todo-remove").addEventListener("click", function () {
            const indexDeleted = toDoData.indexOf(item);
            toDoData.splice(indexDeleted, 1);
            localStorage.setItem("toDoData-local", JSON.stringify(toDoData));
            render();
        });
    });
};
render()
todoControl.addEventListener("submit", function (event) {
    event.preventDefault();
    if (headerInput.value == "") {
        return;
    }
    const newToDo = {
        text: headerInput.value,
        completed: false,
    };
    toDoData.push(newToDo);
    localStorage.setItem("toDoData-local", JSON.stringify(toDoData));
    headerInput.value = "";

    render();
});
