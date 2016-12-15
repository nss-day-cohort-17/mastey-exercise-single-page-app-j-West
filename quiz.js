var mainDiv = document.querySelector(".container")
var inputField = document.querySelector("#input-field")
var colors = ["goldenrod", "burlywood", "magenta", "tomato", "teal", "crimson",
              "darkseagreen", "cyan", "mediumorchid", "oldlace", "gray",
              "mistyrose", "lightsalmon", "moccasin", "orchid", "silver",
              "thistle", "saddlebrown", "maroon"]




function descriptionUpdate(e) {
  var carDivs = mainDiv.querySelectorAll(".pick-me")
  var selectedDiv;

  for (var i = 0; i < carDivs.length; i++) {

      if (carDivs[i].classList.contains("bigger-border")) {
        selectedDiv = carDivs[i]
        var char = inputField.value;
        selectedDiv.querySelector("#updating").innerHTML = char

        i += 100
      }
  }

}


function inputBarChanges() {
  inputField.value = "";
  inputField.focus();
}

function getRandomNum() {
  return Math.floor(Math.random() * 19);
}

//

function biggerBorderAndBackgroundColor(div, cArray) {
  var rando = getRandomNum()
  div.style.backgroundColor = cArray[rando]
  div.classList.toggle("bigger-border")

  inputBarChanges()
}

function borderAndBackgroundDefault() {
  var carDivs = document.querySelectorAll(".pick-me")
  for (var i = 0; i < carDivs.length; i++) {


    if (carDivs[i].classList.contains("border-class")) {
      carDivs[i].style.backgroundColor = "inherit"
      carDivs[i].classList.remove("bigger-border")
    }
  }
}

function isTargetADiv(e) {
  borderAndBackgroundDefault()
  inputBarChanges()
  if (e.target.classList.contains("target-class") && e.target.tagName === "DIV") {
    var divToChange = e.target;
    biggerBorderAndBackgroundColor(divToChange, colors)
  } else if (e.target.classList.contains("target-class")) {
    var parentDiv = e.target.parentNode;
    biggerBorderAndBackgroundColor(parentDiv, colors)
  }

}

function activateEvents() {
  mainDiv.addEventListener("click", isTargetADiv)
  inputField.addEventListener("keyup", descriptionUpdate)
}

function populatePage(data) {
  var rowDiv = document.createElement("div");
  rowDiv.classList.add("row")

  for (var i = 0; i < data.cars.length; i++) {
    if (i !== 0 && i % 3 === 0) {
      var rowDiv = document.createElement("div")
        rowDiv.classList.add("row")
    }
    var colDiv1 = document.createElement("div");
    colDiv1.classList.add("col-md-3", "border-class", "target-class", "pick-me", "col-height-class")

    if (i !== 0 && i % 3 !== 0) {
      colDiv1.classList.add("col-md-offset-1")
    }
    colDiv1.innerHTML =  `
                          <h2 class="text-center target-class">${data.cars[i].make}</h2>
                          <h3 class="text-center target-class">${data.cars[i].model}</h3>
                          <p class="text-center target-class">${data.cars[i].year}</p>
                          <p class="text-center target-class">${data.cars[i].price}</p>
                          <div id="updating" class="target-class scrolling">${data.cars[i].description}</div>
                        `


    rowDiv.appendChild(colDiv1);
    mainDiv.appendChild(rowDiv)
  }
}


function loadInventory() {
  let myRequest = new XMLHttpRequest();

  myRequest.addEventListener("load", (e) => {
    var data = JSON.parse(e.target.responseText)
    populatePage(data)
  });
  myRequest.open("GET", "https://spa-mastey-quiz.firebaseio.com/.json")
  myRequest.send();
}

loadInventory();
activateEvents();
