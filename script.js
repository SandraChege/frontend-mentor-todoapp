document.addEventListener("DOMContentLoaded", function () {
  const list = document.getElementById("list");
  const forms = document.forms;
  // add to do
  const addForm = forms["addtodo"];
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // create elements
    const value = addForm.querySelector('input[type="text"]').value;
    //1. Retrieve the whole list from local storage
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    //1. save in local storage
    todos.push({ value });
    // save the updated array back to local storage
    localStorage.setItem("todos", JSON.stringify(todos));

    const li = document.createElement("li");
    const todoName = document.createElement("span");
    const deleteBtn = document.createElement("span");
    const updateBtn = document.createElement("span");

    //retrive last added movie
    const lasttodo = todos[todos.length - 1];
    // add text content
    todoName.textContent = lasttodo.value;
    deleteBtn.textContent = "Delete";
    updateBtn.textContent = "Update";
    // add classes
    todoName.classList.add("name");
    deleteBtn.classList.add("deleteBtn");
    updateBtn.classList.add("updateBtn");
    // append to DOM
    li.appendChild(todoName);
    li.appendChild(deleteBtn);
    li.appendChild(updateBtn);
    list.appendChild(li);
    // clear input
    addForm.querySelector('input[type="text"]').value = "";
  });
  //delete todo
  list.addEventListener("click", (e) => {
    if (e.target.className == "deleteBtn") {
      // get parent li
      const li = e.target.parentElement;
      li.parentNode.removeChild(li);
      // Retrieve existing todos from local storage
      const index = Array.from(li.children).indexOf(li);
      // Retrieve existing todos from local storage
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      // Remove the movie at the specified index
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });
  //update todo
  list.addEventListener("click", (e) => {
    if (e.target.className == "updateBtn") {
      // get parent li
      const li = e.target.parentElement;
      // Retrieve existing todo from local storage
      const index = Array.from(li.children).indexOf(li);
      const todos = JSON.parse(localStorage.getItem("todos")) || [];

      // Create input field
      const input = document.createElement("input");
      input.classList.add("updateInput");
      input.value = li.textContent.trim();
      li.innerHTML = "";
      li.appendChild(input);

      // Create update and cancel buttons
      const updateBtn = document.createElement("span");
      updateBtn.textContent = "Update";
      updateBtn.classList.add("confirmUpdateBtn");
      const cancelBtn = document.createElement("span");
      cancelBtn.textContent = "Cancel";
      cancelBtn.classList.add("confirmCancelBtn");

      li.appendChild(updateBtn);
      li.appendChild(cancelBtn);

      // Handle update
      updateBtn.addEventListener("click", () => {
        // Update todo in array
        const value = input.value;
        const index = todos.indexOf(li.textContent.trim());
        todos[index] = value;
        localStorage.setItem("todos", JSON.stringify(todos));
      });
      cancelBtn.addEventListener("click", () => {
        // Restore original todo text on cancel
        li.innerHTML = todos[index];
      });
    }
  });
});
