const PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };

function validInteger(value) {
  const number = Number(value);
  return Number.isInteger(number) && number >= 0 && String(number) === String(value); // Checks if it's a non-negative integer
}

function validatePriority(priority) {
    const validPriorities = [1, 3, 5, 7];
    if (typeof priority === 'number' && validPriorities.includes(priority)) { // Checks if the priority is a valid number
        return priority;
    }
    if (typeof priority === 'string') { // Checks if the priority is a string and converts into a integer
        const numericPriority = parseInt(priority, 10);
        if (validPriorities.includes(numericPriority)) {
            return numericPriority;
        }
    }
    return PRIORITY.LOW; // Default to LOW priority
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
  #title; // These are private fields
  #priority;
  #added;

  constructor(title, priority) {
      this.#title = title; // This is setting the private fields
      this.#priority = validatePriority(priority);
      this.#added = todaysDate();
  }

  get title() {
      return this.#title;
  }
  get priority() {
      return this.#priority;
  }
  get added() {
      return this.#added;
  }
  get _title() {
      return this.#title;
  }
  get _priority() {
      return this.#priority;
  }
  get _added() {
      return this.#added;
  }
    // Setter for task priority with validation
  set priority(newPriority) {
      this.#priority = validatePriority(newPriority);
  }
}

class ToDo {
    #tasks;

    constructor() {
        this.#tasks = []; // Initialise an empty task array
    }

    add(task) {
        this.#tasks.push(task);
        return this.#tasks.length;
    }

    remove(title) {
        const index = this.#tasks.findIndex(task => task.title === title); // Find task index by title
        if (index !== -1) {
            this.#tasks.splice(index, 1); // Remove task from the array
            return true; // Return true indicating success
        }
        return false; // Return false if task not found
    }

    list(priority = 0) {
        // Return all tasks or tasks with the specified priority
        return this.#tasks
            .filter(task => priority === 0 || task.priority === priority)  // Include tasks with the specified priority or all if priority is 0
            .map(task => [task.added, task.title, task.priority]);  // Map to an array of task details
    }

    task(title) {
        const foundTask = this.#tasks.find(task => task.title === title); // Find the task in the tasks array by title
        if (foundTask) {
            return foundTask;
        }
        throw new Error(`Task '${title}' Not Found`);
    }
}

// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}
