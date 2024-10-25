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
    this.#priority = validatePriority(priority); // Validate priority here
    this.#added = todaysDate(); // Use todaysDate to set the added date
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
  #tasks; // Private field for tasks

  constructor() {
      this.#tasks = []; // Initialize an empty list of tasks
  }

  add(task) {
      this.#tasks.push(task); // Add the Task instance to the tasks array
      return this.#tasks.length; // Return the total number of tasks
  }

  remove(title) {
      const index = this.#tasks.findIndex(task => task.title === title);
      if (index !== -1) {
          this.#tasks.splice(index, 1); // Remove the task from the array
          return true; // Return true if a task was removed
      }
      return false; // Return false if no task was found
  }

  list(priority = 0) {
      // Return all tasks or tasks with the specified priority
      return this.#tasks
          .filter(task => priority === 0 || task.priority === priority)
          .map(task => [task.added, task.title, task.priority]);
  }

  task(title) {
      const foundTask = this.#tasks.find(task => task.title === title);
      if (foundTask) {
          return foundTask; // Return the found task
      }
      throw new Error(`Task '${title}' Not Found`); // Throw an error if not found
  }
}


// Testing validInteger function
console.log(validInteger(5)); // true
console.log(validInteger(-1)); // false
console.log(validInteger('10')); // true
console.log(validInteger('abc')); // false

// Testing validatePriority function
console.log(validatePriority(3)); // 3
console.log(validatePriority('5')); // 5
console.log(validatePriority(10)); // 1 (default LOW)
console.log(validatePriority('invalid')); // 1 (default LOW)

// Testing todaysDate function
console.log(todaysDate()); // Current date in 'dd/mm/yyyy hh:mm:ss' format

// Testing Task and ToDo classes
const task1 = new Task('Get Cappuccino', PRIORITY.MEDIUM);
console.log(task1.added); // Should show current date and time
console.log(task1.title); // 'Get Cappuccino'
console.log(task1.priority); // 3 (MEDIUM)

const taskList = new ToDo();
console.log(taskList.add(task1)); // 1
console.log(taskList.list()); // List all tasks
console.log(taskList.remove('Get Cappuccino')); // true
console.log(taskList.list()); // Should be empty

// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}