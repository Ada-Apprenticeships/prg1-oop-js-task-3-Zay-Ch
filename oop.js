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



function validatePriority(priority) { // value can be a string or a number (integer)
  
}


function todaysDate () {
  
}


class Task  {

  // (title, priority)
}


class ToDo {
    
}








// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}