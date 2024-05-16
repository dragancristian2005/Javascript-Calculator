const oldNumber = document.getElementById("old-number");
const newNumber = document.getElementById("new-number");
const buttonsElements = document.querySelectorAll(".btn");

let number = "";
const operations = ["/", "*", "-", "+", "**"];

buttonsElements.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.operation === "C") {
      clear();
    }
    if (button.dataset.operation === "=") {
      calculate();
    }
    if (button.dataset.operation === "D" && number !== "") {
      number = number.slice(0, -1);
      newNumber.textContent = number;
    }
    if (button.dataset.operation === ".") {
      const matches = number.match(/\./g);
      if (matches <= 0) {
        number += ".";
        newNumber.textContent = number;
      }
    }
    if (button.dataset.operation === "+/-") {
      number = eval(number + "*(-1)");
      newNumber.textContent = number;
    }
    if (button.dataset.operation === "!") {
      let secondNumber = 1;
      for (let i = 1; i <= eval(number); i++) {
        secondNumber *= i;
      }
      number = secondNumber.toString();
      newNumber.textContent = number;
    }
    if (button.dataset.operation === "sqrtx") {
      number = Math.sqrt(eval(number)).toString();
      newNumber.textContent = number;
    }
    if (button.dataset.operation === "x^2") {
      number = eval(number + "*" + number);
      newNumber.textContent = number;
    }
    if (button.dataset.operation === "1/x") {
      number = eval("1/" + number);
      newNumber.textContent = number;
    }
    if (button.dataset.number) {
      number += button.dataset.number;
      newNumber.textContent = number;
    }
    if (
      number !== "" &&
      operations.some((op) => button.dataset.operation === op)
    ) {
      if (oldNumber.textContent !== "") {
        number = eval(oldNumber.textContent + number);
        oldNumber.textContent = "";
        newNumber.textContent = number;
      }
      number += ` ${button.dataset.operation} `;
      oldNumber.textContent = number;
      number = "";
    }
  });
});

function clear() {
  number = "";
  newNumber.textContent = "";
  oldNumber.textContent = "";
}

function calculate() {
  newNumber.textContent = eval(oldNumber.textContent + number);
  oldNumber.textContent = "";
  number = newNumber.textContent;
}
