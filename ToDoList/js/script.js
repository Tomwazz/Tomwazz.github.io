document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#error").style.display = "none";
    document.querySelector("#notification").style.display = "none";
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
    // Enter tlačítko
document.getElementById("myInput").onkeypress = function(event) {
    if (event.key === "Enter") {
        newElement();
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
      // Show the error message
      document.querySelector("#error").style.display = "block";
      // Display the error message letter by letter
      displayMessage("Musíš zadat nějakou aktivitu!", "error");
      // Set a timeout to hide the error message after 2 seconds
      setTimeout(function() {
        document.querySelector("#error").style.display = "none";
      }, 6000);
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
        item.ondblclick = function() {
            this.classList.toggle("checked");
          
            console.log(this);
            let temp = todos.find(i => i.name === (this.childNodes[0].textContent));
            if (temp.completed) temp.completed = false;
            else temp.completed = true;
            saveTodos();
          };
    }
    function displayMessage(message, elementId) {
      // Get the element where the message will be displayed
      let element = document.getElementById(elementId);
      // Set the element's text content to an empty string
      element.textContent = "";
      // Set the counter for the loop
      let i = 0;
      // Set an interval to add one letter at a time
      let intervalId = setInterval(function() {
        // Add the next letter to the element's text content
        element.textContent += message[i];
        // Increment the counter
        i++;
        // If we have reached the end of the message, clear the interval
        if (i >= message.length) {
          clearInterval(intervalId);
        }
      }, 100);
    }
    const listItems = document.querySelectorAll("li");
      for (const listItem of listItems) {
        let item;
        // Create copy button
        const copyButton = document.createElement("button");
        copyButton.innerHTML = '<i class="fa fa-copy"></i>Copy';
        listItem.appendChild(copyButton);
      
        // Create edit button
        const editButton = document.createElement("button");
        editButton.innerHTML = '<i class="fa fa-pen-square"></i>Edit';
        listItem.appendChild(editButton);
        // Add event listener to copy button
        copyButton.addEventListener("click", () => {
          const text = listItem.firstChild.nodeValue;
          navigator.clipboard.writeText(text);
        });
      
        
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
      listItem.replaceChild(document.createTextNode(this.value), listItem.firstChild);
    }
    input.onkeypress = function(event) {
      if (event.key === "Enter") {
        listItem.replaceChild(document.createTextNode(this.value), listItem.firstChild);
      }
    }
  });
        // Add event listener to edit button
editButton.addEventListener("click", () => {
    listItem.firstChild.nodeValue = "";
  });
  listItem.addEventListener("blur", () => {
    originalText = listItem.firstChild.nodeValue;
    listItem.contentEditable = "false";
  });
  // Add "edit-btn" class to edit button
editButton.classList.add("cc");
// Add "copy-btn" class to copy button
copyButton.addEventListener("click", function() {
  notificationOn(`Úspěšně jsi zkopíroval: "${item.firstChild.nodeValue}"`);
});
copyButton.classList.add("cc");
// Add event listener to copy button
copyButton.addEventListener("click", function() {
  // Get the text of the list item
  const text = listItem.firstChild.nodeValue;
  // Call the notificationOn function and pass the text as an argument
  notificationOn(text);
});

// Hide notification element after 2 seconds
function notificationOn(item) {
  // Show the notification message
  document.querySelector("#notification").style.display = "block";
  // Set the notification message to an empty string
  document.querySelector("#notification").innerHTML = "";
  // Set a counter to 0
  let i = 0;
  // Use a setInterval function to display each letter of the message with a delay
  let interval = setInterval(function() {
    // Append the next letter to the notification message
    document.querySelector("#notification").innerHTML += item[i];
    // Increment the counter
    i++;
    // If all the letters have been displayed, clear the interval
    if (i >= item.length) {
      clearInterval(interval);
    }
  }, 50); // 50ms delay between each letter
  // Set a timeout to hide the notification message after 2 seconds
  setTimeout(function() {
    document.querySelector("#notification").style.display = "none";
  }, 2000);
}
      }
})
;
