document.addEventListener("DOMContentLoaded", () => {
    // Enter button
    document.getElementById("myInput").onkeypress = function(event) {
      if (event.key === "Enter") {
        newElement();
      }
    };
  
    let parky = [];
  
    class Todo {
      constructor(name) {
        this.name = name;
        this.completed = false;
        this.favorite = false;
      }
    }
  
    getParky();
  
    function addNewParky(name) {
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
      });
    }
  
    function newElement() {
      let inputValue = document.querySelector("#myInput").value;
      if (inputValue.length > 0) {
        let li = document.createElement("li");
        li.innerHTML = inputValue;
        document.querySelector("#myUL").appendChild(li);
        document.querySelector("#myInput").value = "";
        updateListItem(li);
  
        addNewParky(inputValue);
        saveParky();
      } else {
        errorOn();
      }
    }
  
    function errorOn() {
      document.querySelector("#error").style.display = "block";
    }
  
    function errorOff() {
      document.querySelector("#error").style.display = "none";
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
        span.onclick = function() {
          this.parentElement.style.display = "none";
      
          let index = parky.findIndex(
            i => i.name === item.childNodes[0].textContent
          );
          parky.splice(index, 1);
          saveParky();
        };
      
        span.appendChild(txt);
        item.appendChild(span);
      
        let star = document.createElement("span");
        let starTxt = document.createTextNode("\u2605");
        star.className = "favorite";
        star.onclick = function() {
          this.parentElement.classList.toggle("favorite");
          let index = parky.findIndex(
            i => i.name === item.childNodes[0].textContent
          );
          parky[index].favorite = !parky[index].favorite;
          saveParky();
        };
      
        star.appendChild(starTxt);
        item.appendChild(star);
      
        // Add a dblclick event listener to the list item
        item.addEventListener("dblclick", editItem);
      }
      
      // Edit list item function
function editItem(event) {
    // Get the current value of the list item
    let currentValue = event.target.textContent;
  
    // Create an input field
    let input = document.createElement("input");
    input.type = "text";
    input.value = currentValue;
  
    // Replace the list item with the input field
    event.target.parentNode.replaceChild(input, event.target);
    input.focus();
  
    // Add a keypress event listener to the input field
    input.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        // Save the edit when the Enter key is pressed
        saveEdit(event);
      }
    });
  }
  
  // Save edit function
  function saveEdit(event) {
    // Get the edited value
    let editedValue = event.target.value;
  
    // Create a new list item with the edited value
    let li = document.createElement("li");
    li.innerHTML = editedValue;
    updateListItem(li);
  
    // Replace the input field with the new list item
    event.target.parentNode.replaceChild(li, event.target);
 // Update the parky array with the edited value
 let index = parky.findIndex(
    i => i.name === currentValue
  );
  parky[index].name = editedValue;
  saveParky();
}

document.querySelector("#addBtn").onclick = newElement;
document.querySelector("#error").onclick = errorOff;

console.log("DOM loaded.");})