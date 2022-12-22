document.addEventListener("DOMContentLoaded", () => {

    document.querySelector('#addBtn').onclick = newElement;
    document.querySelector('#error').onclick = errorOff;

    let todos = [];

    class Todo {
        constructor(name) {
            this.name = name;
            this.completed = false;
        }

    }
    gettodos();

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
            let li = document.createTextNode(name);
            li.appendChild(txt);
            if (completed) li.classList = "checked";
            updatelistitem(li);
            document.querySelector("#myUL").appendChild(li);
        });
    };

    function newElement() {


        let inputValue = document.querySelector("#myInput").value;

        if (inputValue.length > 0) {
            let li = document.createElement("li");
            li.innerHTML = inputValue;
            document.querySelector("#myUL").appendChild(li);
            document.querySelector("#myInput").value = "";
            updatelistitem(li);

            addNewTodo(inputValue);
            saveTodos();

        } else {
            errorOn();
        }

    }

    function errorOn() {
        document.querySelector("#error").style.display = "flex";
    }

    function errorOff() {
        document.querySelector("#error").style.display = "none";
    }

    function updatelistitem(item) {
        let span = document.createElement('span');
        let txt = document.createTextNode('\u00D7');
        span.className = "close";
        span.onclick = function () {
            this.parentElement.style.display = "none";

            let index = todos.findIndex(i =>
                i.name === (item.childNodes[0].textContent));
            todos.splice(index, 1);
            saveTodos();
        }
        span.appendChild(txt);
        item.appendChild(span);
        item.onclick = function () {
            this.classList.toggle("checked");

            console.log(this);
            let temp = todos.find(i =>
                i.name === (this.childNodes[0].textContent));

                if(temp.completed) temp.completed = false;
                else temp.completed = true;
                saveTodos();
        }
    }
});