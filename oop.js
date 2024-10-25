PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };


function validInteger(value) {
  const number = Number(value);
  // Check if the conversion resulted in a valid number
  if (isNaN(number)) {
    return false;
  }
  // Check if the number is a positive integer
  if (number > 0 && Number.isInteger(number)) {
    console.log("The number can be represented as a valid integer.");
    return true;
  }
  return false;
}

function validatePriority(priority) {
    const validPriorities = [1, 3, 5, 7];
    
    // Check if the priority is a number and is in the valid priorities array
    if (typeof priority === 'number' && validPriorities.includes(priority)) {
        return priority;
    }
    // Check if the priority is a string that can be converted to a number
    if (typeof priority === 'string') {
        const numericPriority = parseInt(priority, 10);
        if (validPriorities.includes(numericPriority)) {
            return numericPriority;
        }
    }
    return 1; // LOW priority
}

function todaysDate() {
  const now = new Date();
  
  return [
      String(now.getDate()).padStart(2, '0'),
      String(now.getMonth() + 1).padStart(2, '0'),
      now.getFullYear()
  ].join('/') + ' ' + 
  [
      String(now.getHours()).padStart(2, '0'),
      String(now.getMinutes()).padStart(2, '0'),
      String(now.getSeconds()).padStart(2, '0')
  ].join(':');
}

class Task {
  #title; // Private field for title
  #priority; // Private field for priority
  #added; // Private field for the date added

  constructor(title, priority) {
      this.#title = title;
      this.#priority = priority;
      this.#added = new Date().toLocaleString(); // Store the current date and time as a string
  }

  get title() {
      return this.#title; // Getter for title
  }

  get priority() {
      return this.#priority; // Getter for priority
  }

  get added() {
      return this.#added; // Getter for added date
  }

  set priority(newPriority) {
      this.#priority = newPriority; // Setter for priority
  }
}

class ToDo {
    
}








// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}