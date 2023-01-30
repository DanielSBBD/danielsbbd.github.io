var counter = 0

function toggleNav() {
    if (document.getElementById("navbar").style.top == "100px") {
        document.getElementById("navbar").style.top = "-200px";
    }
    else {
        document.getElementById("navbar").style.top = "100px";
    }
}

function enterAction() {
    document.getElementById("info1").style.width = "40%";
    document.getElementById("info1").style.left = "30%";
    document.getElementById("info1").style['border-color'] = "black";
}
function leaveAction() {
    document.getElementById("info1").style.width = "0%";
    document.getElementById("info1").style.left = "50%";
    document.getElementById("info1").style['border-color'] = "rgb(116, 0, 0)";
}