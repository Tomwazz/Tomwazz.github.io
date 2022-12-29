document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#addBtn").onclick = newElement;
    document.querySelector("#error").onclick = errorOff;
    
    console.log("DOM loaded.")

    let todos = [];

    class Todo {
        constructor(name) {
            this.name = name;
            this.completed = false;
        }
    }

    getTodos();

    function addNewTodo(name) {
        let temp = new Todo(name);
        todos.push(temp);
    }

    function saveTodos() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function getTodos() {
        todos = JSON.parse(localStorage.getItem("todos"));

        if (!todos) todos = [];
        todos.forEach(item => {
            let name = item.name;
            let completed = item.completed;
            let li = document.createElement("li");
            let txt = document.createTextNode(name);
            li.appendChild(txt);
            if (completed) li.classList = "checked";
            updateListItem(li);
            document.querySelector("#myUL").appendChild(li);
        })
    }

    function newElement() {
        let inputValue = document.querySelector("#myInput").value;
        if (inputValue.length > 0) {
            let li = document.createElement("li");
            li.innerHTML = inputValue;
            document.querySelector("#myUL").appendChild(li);
            document.querySelector("#myInput").value = "";
            updateListItem(li);

            addNewTodo(inputValue);
            saveTodos();

        } else {
            errorOn();
        }
    }
    
    function errorOn() {
        document.querySelector("#error").style.display = "block";
    }
    
    function errorOff() {
        document.querySelector(" #error").style.display = "none";
    }
    function updateListItem(item) {
        let span = document.createElement("span");
        let txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.onclick = function () {
            this.parentElement.style.display = "none";

            let index = todos.findIndex(i => i.name === (item.childNodes[0].textContent));
            todos.splice(index, 1);
            saveTodos();
        }

        span.appendChild(txt);
        item.appendChild(span);        
    }
    // Add event listener to edit button
editButton.addEventListener("click", () => {
    // Create input element
    const input = document.createElement("input");
    input.type = "text";
    input.value = listItem.firstChild.nodeValue;
  
    // Replace text input with input element
    listItem.replaceChild(input, listItem.firstChild);
  
    // Focus on input element
    input.focus();
  
    // Save edited text when input element loses focus or user hits Enter key
    input.onblur = function() {
      // Check if input is a valid URL
      const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
      if (pattern.test(this.value)) {
        // Create anchor element
        const a = document.createElement("a");
        a.href = this.value;
        a.innerHTML = this.value;
        a.target = "_blank";
  
        // Replace input element with anchor element
        listItem.replaceChild(a, listItem.firstChild);
      } else {
        // Replace input element with text node
        listItem.replaceChild(document.createTextNode(this.value), listItem.firstChild);
      }
    }
    input.onkeypress = function(event) {
      if (event.key === "Enter") {
        // Check if input is a valid URL
        const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        if (pattern.test(this.value)) {
          // Create anchor element
          const a = document.createElement("a");
          a.href = this.value;
          a.innerHTML = this.value;
          a.target = "_blank";
  
          // Replace input element with anchor element
          listItem.replaceChild(a, listItem.firstChild);
        } else {
          // Replace input element with text node
          listItem.replaceChild(document.createTextNode(this.value), listItem.firstChild);
        }
      }
    }
  });

})
;
