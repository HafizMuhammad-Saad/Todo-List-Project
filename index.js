const addForm = document.querySelector(".add");
const search = document.querySelector(".search input");
const list = document.querySelector(".todos");


const countTodo = document.querySelector('#countTodo');
const paraCount = document.querySelector('#paraCount');

paraCount.className = ('teal  d-flex justify-content-center align-items-center mt-3');

const updateTodoCount = () => {
  countTodo.textContent = list.children.length;
}

let editTodo = null;
const generateTemplate = (todo) => {
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${todo}</span>
      <i class="fas fa-edit"></i>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `;
  
  list.innerHTML += html;

  updateTodoCount()
};


function generateTemplate1 (todo) {
  const li = document.createElement('li');
  li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

  const span = document.createElement('span');
  span.textContent = todo;

  const icon = document.createElement('i');
  icon.classList.add('far', 'fa-trash-alt', 'delete');



  li.appendChild(span);
  li.appendChild(icon);

  list.appendChild(li);
};


 // write your logic for filter todos

 function filterTodos(searchText) {
    for (let i = 0; i < list.children.length; i++) {
      const li = list.children[i];
      if (li.textContent.includes(searchText)) {
        li.classList.remove("filtered");
      } else {
        li.classList.add("filtered");
      }
    }
  }

// add todos event
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addForm.add.value.trim();
  if (editTodo) {
    editTodo.textContent = todo;
    editTodo = null; // Reset edit mode
    addForm.reset(); // Clear the input field
    return;
  }

  if (todo.length) {
    generateTemplate(todo);
    addForm.reset();
  }
});

// delete todos event
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    updateTodoCount()
  }
  if (e.target.classList.contains("fa-edit")) {
    editTodo = e.target.previousElementSibling; // Store the todo being edited
    addForm.add.focus(); // Focus on the input field
    addForm.add.value = editTodo.textContent; // Set the value of the input field to the todo text
  }
});


// filter todos event
search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});

const removeAll = document.createElement("button");
removeAll.className = ('removeAll', 'btn button w-100 mt-2');
removeAll.textContent = "remove all";
addForm.append(removeAll)

removeAll.addEventListener("click", function() {
  list.innerHTML = ""
  updateTodoCount()

}) 
list.addEventListener('click', function(e) {
  if(e.target.tagName === 'SPAN') {
    e.target.classList.toggle('complete')
  }
  
})
