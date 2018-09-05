var css = document.querySelector(".gradientText");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");
var random = document.querySelector("button");
var output = document.querySelector(".sliderValue");
var slider = document.querySelector(".slider");
var list = document.querySelector("ul");
var showHistory = document.querySelector("h4");

var historyCount = 0;
var show = false;

output.textContent = "Deg: " + slider.value
setGradient()

function setBackground(color1, color2) {
	body.style.background = 
	"linear-gradient(" + slider.value + "deg, " 
	+ color1 
	+ ", " 
	+ color2
	+ ")";
}

function setGradient() {
	setBackground(color1.value, color2.value)
	css.textContent = body.style.background + ";";
}

color1.addEventListener("input", setGradient);

color2.addEventListener("input", setGradient);

function generateNumber() {

	return Math.floor(Math.random() * 256);
}

function generateColor() {
	var red = generateNumber();
	var green = generateNumber();
	var blue = generateNumber();
	return rgbToHex(red, green, blue);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


function restoreState (degrees, firstColor, secondColor, background) {
	slider.value = degrees;
	color1.value = firstColor;
	color2.value = secondColor;
	body.style.background = background;
	output.textContent = "Deg: " + degrees;
	css.textContent = background + ";";
}

function addToHistory() {
	var li = document.createElement("li");
	li.style.background = body.style.background;
	var degrees = slider.value;
	var firstColor = color1.value;
	var secondColor = color2.value;
	var background = body.style.background;
	li.addEventListener("click", function() {
		restoreState(degrees, firstColor, secondColor, background);
	})
	list.insertBefore(li, list.firstChild);
}

function setRandomColors() {
	var firstColor = generateColor();
	var secondColor = generateColor();
	var degrees = Math.floor(Math.random()*360)
	slider.value = degrees;
	output.textContent = "Deg: " + slider.value;
	setBackground(firstColor, secondColor);
	color1.value = firstColor;
	color2.value = secondColor;
	css.textContent = body.style.background + ";";

	if (historyCount < 11) {
		historyCount++;
		addToHistory();
	} else {
		list.removeChild(list.childNodes[list.childNodes.length-1])
		addToHistory();
	}
}

function setSlider() {
	output.textContent = "Deg: " + slider.value;
	setBackground(color1.value, color2.value);
	css.textContent = body.style.background + ";";
}

random.addEventListener("click", setRandomColors)

slider.addEventListener("input", setSlider)

showHistory.addEventListener("click", function() {
	if (show) {
		this.textContent = "Show Random Color History";
	} else {
		this.textContent = "Hide Random Color History";
	}
	show = !show;
})

