let equation = '';

function updateDisplay() {
    document.getElementById('equation').textContent = equation;
    document.getElementById('result').textContent = equation || '0';
}

function appendToDisplay(value) {
    equation += value;
    updateDisplay();
}

function clearDisplay() {
    equation = '';
    updateDisplay();
}

function backspace() {
    equation = equation.slice(0, -1);
    updateDisplay();
}

function calculate() {
    try {
        // Preventing errors and security risks
        const sanitizedEquation = equation.replace(/[^0-9+\-*/%.]/g, '');
        const result = Function(`return ${sanitizedEquation}`)(); 
        equation = result.toString();
        updateDisplay();
    } catch (error) {
        equation = '';
        document.getElementById('result').textContent = 'Error';
        setTimeout(clearDisplay, 1000);
    }
}

// Keyboard Support
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (/[0-9.%]/.test(key)) {
        appendToDisplay(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
