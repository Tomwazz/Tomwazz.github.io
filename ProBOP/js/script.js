document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#addBtn").onclick = newElement;
    document.querySelector("#error").onclick = errorOff;
    
    console.log("DOM loaded.")

    let parky = [];

    class Todo {
        constructor(name) {
            this.name = name;
            this.completed = false;
            this.favorite = false;
        }
    }

    getParky();
    // Enter tlačítko
document.getElementById("myInput").onkeypress = function(event) {
    if (event.key === "Enter") {
        newElement();
    }
  }

    function addNewTodo(name) {
        let temp = new Todo(name);
        parky.push(temp);
    }

    function saveParky() {
        localStorage.setItem("parky", JSON.stringify(parky));
    }

    function getParky() {
        parky = JSON.parse(localStorage.getItem("parky"));

        if (!parky) parky = [];
        parky.forEach(item => {
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
            saveParky();

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
        let regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+)\.(com|org|net|edu|cz|sk|gay)(\/.+)?\/?$/;
        let match = textContent.match(regex);
        if (match) {
            let link = document.createElement("a");
            link.href = "https://" + match[0];
             // Set the target attribute of the link to "_blank"
        link.target = "_blank";
            link.innerHTML = match[0];
            item.innerHTML = "";
            item.appendChild(link);
        }

        let span = document.createElement("span");
        let txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.onclick = function () {
            this.parentElement.style.display = "none";

            let index = parky.findIndex(i => i.name === (item.childNodes[0].textContent));
            parky.splice(index, 1);
            saveParky();
        }

        span.appendChild(txt);
        item.appendChild(span);

        let star = document.createElement("span");
        let starTxt = document.createTextNode("\u2605");
        star.className = "favorite";
        star.onclick = function () {
            this.parentElement.classList.toggle("favorite");
            let index = parky.findIndex(i => i.name === (item.childNodes[0].textContent));
            parky[index].favorite = !parky[index].favorite;
            saveParky();
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
        let index = parky.findIndex(i => i.name === (item.childNodes[0].textContent));
        parky[index].favorite = !parky[index].favorite;
        saveParky();
    }
    }
);
