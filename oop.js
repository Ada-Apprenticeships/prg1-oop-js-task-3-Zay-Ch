const PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };

function validInteger(value) {
  const number = Number(value);
  
  // Checks if it's a non-negative integer
  return Number.isInteger(number) && number >= 0 && String(number) === String(value);
}

function validatePriority(priority) {
    const validPriorities = [1, 3, 5, 7];

    if (typeof priority === 'number' && validPriorities.includes(priority)) {
        return priority;
    }
    if (typeof priority === 'string') {
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
  #title;
  #priority;
  #added;

  constructor(title, priority) {
      this.#title = title;
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
  set priority(newPriority) {
      this.#priority = validatePriority(newPriority);
  }
}

class ToDo {
    #tasks;

    constructor() {
        this.#tasks = [];
    }

    add(task) {
        this.#tasks.push(task);
        return this.#tasks.length;
    }

    remove(title) {
        const index = this.#tasks.findIndex(task => task.title === title);
        if (index !== -1) {
            this.#tasks.splice(index, 1);
            return true;
        }
        return false;
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
            return foundTask;
        }
        throw new Error(`Task '${title}' Not Found`);
    }
}
/*
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
*/

// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}