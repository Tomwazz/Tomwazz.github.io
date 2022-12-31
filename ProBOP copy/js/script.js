document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#addBtn").onclick = newElement;
    document.querySelector("#error").onclick = errorOff;
    
    console.log("DOM loaded.")

    let todos = [];

    class Todo {
        constructor(name) {
            this.name = name;
            this.completed = false;
            this.favorite = false;
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
            let favorite = item.favorite;
            let li = document.createElement("li");
            let txt = document.createTextNode(name);
            li.appendChild(txt);
            if (completed) li.classList = "checked";
            if (favorite) li.classList = "favorite";
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
        let textContent = item.innerHTML;
        let regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+)\.(com|org|net|edu)$/;
        let match = textContent.match(regex);
        if (match) {
            let link = document.createElement("a");
            link.href = "https://" + match[0];
            link.innerHTML = match[0];
            item.innerHTML = "";
            item.appendChild(link);
        }

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

        let star = document.createElement("span");
        let starTxt = document.createTextNode("\u2605");
        star.className = "favorite";
        star.onclick = function () {
            this.parentElement.classList.toggle("favorite");
            let index = todos.findIndex(i => i.name === (item.childNodes[0].textContent));
            todos[index].favorite = !todos[index].favorite;
            saveTodos();
        }
        
        star.appendChild(starTxt);
        item.appendChild(star);        
    }
    // Add event listener to edit button
    function toggleSpanClassOnClick(span, class1, class2) {
        span.addEventListener('click', function() {
          toggleSpanClass(span, class1, class2);
        });
      }
      
      star.onclick = function () {
        this.parentElement.classList.toggle("favorite");
        let index = todos.findIndex(i => i.name === (item.childNodes[0].textContent));
        todos[index].favorite = !todos[index].favorite;
        saveTodos();
    }
    }
);
