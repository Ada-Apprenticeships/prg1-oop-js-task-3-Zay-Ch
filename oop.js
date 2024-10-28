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

// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}
