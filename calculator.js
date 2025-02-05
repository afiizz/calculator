

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
    switch (operator) {
        case '/':
            return divide(num1, num2);
        default: 
            return null;    

        case '*': 
            return multiply(num1, num2);
        
        case '+':
            return add(num1, num2);
            
        case '-':
            return subtract(num1, num2);
    }   
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
            if(!operator) {
            firstNumber += value
            display.value = firstNumber;
            } else {
            secondNumber += value;
            display.value = firstNumber + " " + operator + " " + secondNumber;
          }         
        } 

        //if the button is an operator not a =
        if(button.classList.contains("operator") && value !== "=") {
            if(firstNumber && !secondNumber) {
                operator = value;
                display.value = firstNumber + " " + operator;
            }
            
           
        }

        //if the button is "=" Calculate result
        if(value === "=") {
            if(firstNumber && secondNumber && operator) {
                let result = operate(operator, Number(firstNumber), Number(secondNumber))

                if(result !== "Error" && result !== null) {
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

        if(button.classList.contains("clear")) {
            firstNumber = "";
            secondNumber = ""; 
            operator = "";
            display.value = "";
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