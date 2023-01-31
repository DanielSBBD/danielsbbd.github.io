window.onload = getJoke;

function toggleNav() {
    if (document.getElementById("navbar").style.top == "100px") {
        document.getElementById("navbar").style.top = "-200px";
    }
    else {
        document.getElementById("navbar").style.top = "100px";
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

var x = 0;
var y = 0;

function moveButton() {
    let xOff, yOff = 0;
    do {
        theta = Math.random()*2*Math.PI;
        xOff = 300*Math.cos(theta);
        yOff = 300*Math.sin(theta);
    } while((x + xOff) < -window.innerWidth*0.4 || (x + xOff) > window.innerWidth*0.4 || (y + yOff) < -window.innerHeight*0.2 || (y + yOff) > window.innerHeight*0.6)

    x += xOff;
    y += yOff;
    document.getElementsByTagName("button")[0].style.transform = `translate(${x}px,${y}px)`;
}

async function getJoke() {
    if(document.URL.includes("index.html")) {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await response.json();
        let quote = data.value;
        const reg = /[Cc]huck(?: [Nn]orris)?/g;
        quote = quote.replaceAll("s\'", "s\'s");
        quote = quote.replaceAll(reg, "Skelly");
        document.getElementById("quote").innerHTML = quote;
    }
}