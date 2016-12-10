var mainDiv = document.querySelector(".container")
var inputField = document.querySelector("#input-field")

function descriptionUpdate(e) {
  var carDivs = mainDiv.querySelector(".row").children
  var selectedDiv;

  // console.log(carDivs);

  for (var i = 0; i < carDivs.length; i++) {

      if (carDivs[i].classList.contains("bigger-border")) {
        selectedDiv = carDivs[i]
        var char = inputField.value;
        selectedDiv.querySelector("#updating").innerHTML = char
        console.log();
        i += 100
      }
      // console.log(selectedDiv);
  }

}


function inputBarChanges() {
  inputField.value = "";
  inputField.focus();
}

function makeBorderBigger(div) {
  // console.log("it works");
  div.classList.toggle("bigger-border")

  inputBarChanges()
}

function isTargetADiv(e) {
  var carDivs = document.querySelector(".row").children
  for (var i = 0; i < carDivs.length; i++) {


    if (carDivs[i].classList.contains("border-class")) {
      console.log("works");
      carDivs[i].classList.remove("bigger-border")
    }
  }

  if (e.target.classList.contains("target-class") && e.target.tagName === "DIV") {
    var divToChange = e.target;
    makeBorderBigger(divToChange)
  } else if (e.target.classList.contains("target-class")) {
    var parentDiv = e.target.parentNode;
    makeBorderBigger(parentDiv)
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
    var colDiv1 = document.createElement("div");
    colDiv1.classList.add("col-md-3", "border-class", "target-class")

    if (i !== 0) {
      colDiv1.classList.add("col-md-offset-1")
    }
    colDiv1.innerHTML =  `
                          <h2 class="text-center target-class">${data.cars[i].make}</h2>
                          <h3 class="text-center target-class">${data.cars[i].model}</h3>
                          <p class="text-center target-class">${data.cars[i].year}</p>
                          <p class="text-center target-class">${data.cars[i].price}</p>
                          <p id="updating" class="target-class">${data.cars[i].description}</p>
                        `

    console.log(colDiv1);
    rowDiv.appendChild(colDiv1);
    mainDiv.appendChild(rowDiv)
  }
}


function loadInventory() {
  let myRequest = new XMLHttpRequest();

  myRequest.addEventListener("load", (e) => {
    var data = JSON.parse(e.target.responseText)
    console.log(data)
    populatePage(data)
  });
  myRequest.open("GET", "inventory.json")
  myRequest.send();
}

loadInventory();
activateEvents();
