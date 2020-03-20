function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace(/\s/g, '').replace(/[(]/g, " ( ").replace(/[)s]/g, " ) ").replace(/[+]/g, " + ").replace(/[-]/g, " - ").replace(/[*]/g, " * ").replace(/[/]/g, " / ").replace(/ {1,}/g, " ").trim();

    var numbersStock = [];
    var operatorsStock = [];
    var priority = {
        "-": 1,
        "+": 1,
        '*': 2,
        '/': 2
    }
    expr = expr.split(' ');
    for (let i = 0; i < expr.length; i++) {
        //если у нас число, то пушим в сток
        if (!isNaN(+expr[i])) {
            pushNumber(+expr[i]);
        } else {
            checkPriority(expr[i]);
        }
    }

    finalCheck();
    function finalCheck() {
        if (operatorsStock.length != 0) {
            if (operatorsStock.some(checkOperator)) {
                finalCacl();
                finalCheck();
            } else {
                throw new RangeError("ExpressionError: Brackets must be paired")
            }
        }
    }

    return +numbersStock[0]








    function checkOperator(element, index, array) {
        return element != '(';
    }

    function finalCacl() {
        var a = numbersStock[numbersStock.length - 2];
        var b = numbersStock[numbersStock.length - 1];
        var c = operatorsStock[operatorsStock.length - 1];
        numbersStock.pop()
        numbersStock.pop()
        operatorsStock.pop()
        selectAction(a, b, c)
    }
    function pushNumber(number) {
        numbersStock.push(number);
    }
    function pushOperators(operator) {
        operatorsStock.push(operator);
    }
    function checkPriority(operator) {
        if (operator == ')' && (operatorsStock.length == 0 || operatorsStock.indexOf('(') == -1)) {
            throw new RangeError("ExpressionError: Brackets must be paired")
        } else
            if ((operatorsStock.length == 0 || priority[operator] > priority[operatorsStock[operatorsStock.length - 1]] || operatorsStock[operatorsStock.length - 1] == '(' || operator == '(') && operator != ')') {
                pushOperators(operator);
            } else if (priority[operator] <= priority[operatorsStock[operatorsStock.length - 1]]) {
                var number_1 = numbersStock[numbersStock.length - 2];
                var number_2 = numbersStock[numbersStock.length - 1];
                var operator_2 = operatorsStock[operatorsStock.length - 1];
                numbersStock.pop()
                numbersStock.pop()
                operatorsStock.pop()
                selectAction(number_1, number_2, operator_2);
                checkPriority(operator);
            } else if (operator == ')') {
                if (operatorsStock[operatorsStock.length - 1] == '(') {
                    operatorsStock.pop()
                } else {
                    finalCacl();
                    checkPriority(operator);
                }
            }
    }

    function selectAction(number_1, number_2, operator_2) {
        if (operator_2 == '+') {
            numbersStock.push(number_1 + number_2);
        }
        if (operator_2 == '-') {
            numbersStock.push(number_1 - number_2);
        }
        if (operator_2 == '*') {
            numbersStock.push(number_1 * number_2);
        }
        if (operator_2 == '/') {
            if (number_2 == 0) {
                throw new RangeError("TypeError: Division by zero.")
            }
            numbersStock.push(number_1 / number_2);
        }
    }

}

module.exports = {
    expressionCalculator
}