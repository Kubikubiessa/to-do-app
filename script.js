window.addEventListener("load", () => {
  const form = document.querySelector(".task-input-form");
  const input = document.querySelector("#new-task-input");
  const list_element = document.querySelector("#tasks");
  let todos = [];

  form.addEventListener("submit", createTodo);
  function createTodo() {
    const task = {
      id: new Date().getTime(),
        text: input.value
      //text: "",
    };
    //task.text = input.value;
    console.log(task);
    if (!task) {
      alert("Please enter a task!");
      return;
    }

    todos.unshift(task);
    const { task_el, list } = createTodoEl(task);
    list_element.appendChild(task_el);
    task_el.appendChild(list);
    saveTodos();
  }
  function createTodoEl(task) {
    const task_el = document.createElement("div");
    task_el.classList.add("task");
    const list = document.createElement("ul");
    list.classList.add("ul-task-list");
    task_el.appendChild(list);
    const listItem = document.createElement("li");
    listItem.classList.add("list-item");
    listItem.innerText = input.value;
    //istItem.innerText = task.text;
    list.appendChild(listItem);
    const task_action_el = document.createElement("div");
    task_action_el.classList.add("actions");
    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerHTML = "Delete";
    task_action_el.appendChild(task_delete_el);
    task_el.appendChild(task_action_el);

    //EVENTS
    task_delete_el.addEventListener("click", () => {
      todos = todos.filter((t) => t.id != task.id);
      list_element.removeChild(task_el);
       saveTodos();
    });

    return { task_el, list, task_action_el, task_delete_el };
  }
 
  function displayTodos() {
    getTodos();
    console.log(todos);
    for (let i = 0; i < todos.length; i++) {
        const task = todos[i];
        
        const { task_el, list } = createTodoEl(task);

        task_el.append(list);
        
    }
  }
  displayTodos();
//SAVE TODOS:
  function saveTodos() {
    const save = JSON.stringify(todos);
    localStorage.setItem("my_todos", save);
   
  }
  function getTodos() {
    const data = localStorage.getItem("my_todos");
    if (data) {
        todos = JSON.parse(data);
    }
  }
});
