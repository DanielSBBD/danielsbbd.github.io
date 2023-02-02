window.onload = getJoke;

function toggleNav() {
    if (document.getElementsByTagName("nav")[0].style.top == "6.25rem") {
        document.getElementsByTagName("nav")[0].style.top = "-17.5rem";
    }
    else {
        document.getElementsByTagName("nav")[0].style.top = "6.25rem";
    }
}

function enterAction(id) {
    document.getElementById("info"+id).style.width = "80%";
    document.getElementById("info"+id).style.left = "10%";
    document.getElementById("info"+id).style['border-color'] = "black";
}

function leaveAction(id) {
    document.getElementById("info"+id).style.width = "0%";
    document.getElementById("info"+id).style.left = "50%";
    document.getElementById("info"+id).style['border-color'] = "rgba(0, 0, 0, 0)";
}

let x = 0;
let y = 0;

function moveButton() {
    let xOff, yOff = 0;
    do {
        theta = Math.random()*2*Math.PI;
        xOff = 300*Math.cos(theta);
        yOff = 300*Math.sin(theta);
    } while((x + xOff) < -window.innerWidth*0.3 || (x + xOff) > window.innerWidth*0.3 || (y + yOff) < -window.innerHeight*0.2 || (y + yOff) > window.innerHeight*0.3)

    x += xOff;
    y += yOff;
    document.getElementsByTagName("button")[0].style.transform = `translate(${x}px,${y}px)`;
}

function enter(char) {
    el = document.getElementById("input");
    if(el.value[0]=='=') {
        el.value="";
    }
    document.getElementById("input").value += char;
}

function cl() {
    document.getElementById("input").value = "";
}

function calculate() {
    el = document.getElementById("input");
    input = el.value;
    output = "Invalid Input";

    // Remove spaces
    input = input.replace(/\s/g, "");

    //Check that all characters are valid
    if(/^[\d\(\)\/*\-+.]+$/.test(input)) {
        input = input.split("");
        input = group(input);
        output = '='+evaluate(input);
    } 
    el.value = output;
}

function evaluate(input) {
    let start = [];
    let bCount = 0;

    // Process brackets
    for(let i=0;i<input.length;i++) {
        if(input[i]=='(') {
            start.push(i);
            bCount++;
        } else if(input[i]==')') {
            let popped = start.pop()
            subExp = input.slice(popped+1,i)
            input.splice(popped, i-popped+1, evaluate(subExp)[0])
            i -= i-popped;
            bCount--;
        }
    }

    // Verify valid expression
    let expectNum = true;
    for(let i=0;i<input.length;i++) {
        if(expectNum) {
            if(isNaN(input[i])) {
                return "Syntax Error";
            }
            expectNum = false;            
        } else {
            if(!isNaN(input[i])) {
                return "Syntax Error";
            }
            expectNum = true;
        }
    }
    if(expectNum) {
        return "Syntax Error";
    }

    // Process * and /
    while(input.includes('*') || input.includes('/')) {
        for(let i=1;i<input.length-1;i+=2) {
            if(input[i]=='*') {
                input.splice(i-1, 3, (input[i-1] * input[i+1]))
            } else if(input[i]=='/') {
                input.splice(i-1, 3, (input[i-1] / input[i+1]))
            }
        }
    }

    // Process + and -
    while(input.includes('+') || input.includes('-')) {
        for(let i=1;i<input.length-1;i+=2) {
            if(input[i]=='+') {
                input.splice(i-1, 3, (+input[i-1] + +input[i+1]))
            } else if(input[i]=='-') {
                input.splice(i-1, 3, (input[i-1] - input[i+1]))
            }
        }    
    }

    return input;
}

function group(arr) {
    let out = [arr[0]];
    let opReg = /^[+\-*\/]$/;
    let numReg = /\d/;
    for(let i=1;i<arr.length;i++) {
        let isNum = !isNaN(out[out.length-1]+arr[i]);
        if((i==1 && isNum) || (i>=2 && !(numReg.test(arr[i-2]) && opReg.test(arr[i-1]))) && isNum) {
            out[out.length-1] += arr[i];
        } else {
            out.push(arr[i]);
        }
    }
    return out;
}

async function getJoke() {
    if(document.URL.includes("index.html")) {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await response.json();
        let quote = data.value;
        const reg = /[Cc]huck(?: [Nn]orris)?/g;
        quote = quote.replaceAll("s\'", "s\'s");
        quote = quote.replaceAll(reg, "Skelly");
        document.getElementById("quote").innerText = quote;
    }
}

let input = document.getElementById("input");

input.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        calculate()
    }
});