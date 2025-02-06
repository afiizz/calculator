
function divide(a, b) {
    if( b === 0) {
        return "Error"
        
    } else {
        return a / b;
    }

}

function multiply(a, b) {
    return a * b;
}

function add(a, b) {
    return a + b;
} 

function subtract(a, b) {
    return a - b; 

} 


function operate( operator, num1, num2) {

    if (operator === "" || isNaN(num1) || isNaN(num2)) {
        return "Error";  // Prevents Undefined or Null cases
    }

    let result; 
    switch (operator) {
        case '*': 
            result = multiply(num1, num2);
            break;
        
        case '+':
            result = add(num1, num2);
            break;
            
        case '-':
            result = subtract(num1, num2);
            break;

        case '/':
            result = divide(num1, num2); 
            break; 

        default: 
            return null;       
    }   

    if (typeof result === "number" && !isNaN(result)) {
        return parseFloat(result.toFixed(5)); 
    }
    
    return "Error"; 
}

let firstNumber = ""; 
let secondNumber = ""; 
let operator = ""; 

let display = document.querySelector('.display');

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", () => {
        let value = button.textContent;

        //if The button is a number or decimal
        if(!isNaN(value) || value === ".") {
            if (!operator) {
                if ( value === "." && firstNumber.includes("."))
                    return; 
                firstNumber += value
                display.value = firstNumber;

            } else {
                if (value === "." && secondNumber.includes("."))
                    return;
                secondNumber += value;
                display.value = firstNumber + " " + operator + " " + secondNumber;
            }         
        } 

        //if the button is an operator not a =
        if(button.classList.contains("operator") && value !== "=") {
            if (firstNumber && secondNumber) {

                let result = operate(operator, Number(firstNumber), Number(secondNumber));

                if (result !== "Error" && result !== null ) {
                    display.value = result; 
                    firstNumber = result.toString();
                    secondNumber = "";
                    operator = value;
                    display.value = firstNumber + " " + operator;
                } else {
                    display.value = "Error";
                    firstNumber = "";
                    secondNumber = "";
                    operator = "";
                }

            } else if (firstNumber) {
                operator = value; 
                display.value = firstNumber + " " + operator;
            }
            
           
        }

        //if the button is "=" Calculate result
        if ( value === "=") {
            if (firstNumber && secondNumber && operator) {
                let result = operate(operator, Number(firstNumber), Number(secondNumber))

                if (result !== "Error" && result !== null && result !== undefined) {
                    display.value = result;
                    firstNumber = result.toString();
                    secondNumber = "";
                    operator = ""; 

                } else {
                    display.value = "Error"; 
                    firstNumber = "";
                    secondNumber = "";
                    operator = ""; 
                }
            }
        }

        if (button.classList.contains("clear")) {
            firstNumber = "";
            secondNumber = ""; 
            operator = "";
            display.value = "";
        }


        if (button.classList.contains("backspace")) {
            if(!operator) {

                firstNumber = firstNumber.slice(0, -1);
                display.value = firstNumber || "0";

            } else if (operator && !secondNumber) {
                operator = "";
                display.value = firstNumber;

            } else {
                secondNumber = secondNumber.slice(0, -1);
                display.value = firstNumber + " " + operator + " " + secondNumber;
            }

        }

        button.addEventListener("mousedown", () => {
            button.classList.add("clicked");
        });
        
        button.addEventListener("mouseup", () => {
            setTimeout(() => {
                button.classList.remove("clicked");
            }, 100);

        });    

       
    }); 
    
});