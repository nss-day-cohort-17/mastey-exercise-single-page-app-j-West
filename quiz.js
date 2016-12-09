


var mainDiv = document.querySelector(".container")



function populatePage(data) {
  for (var i = 0; i < data.cars.length; i++) {
    var rowDiv = document.createElement("div");
    var colDiv1 = document.createElement("div");
    // var colDiv2 = document.createElement("div");
    // var colDiv3 = document.createElement("div");
    colDiv1.classList.add("col-md-3")
    if (i !== 0) {
      colDiv1.classList.add("col-md-offset-1")
    }
    colDiv1.innerHTML =  `
                          <h2 class="text-center">${data.cars[i].make}</h2>
                          <h3 class="text-center">${data.cars[i].model}</h3>
                          <p class="text-center">${data.cars[i].year}</p>
                          <p class="text-center">${data.cars[i].price}</p>
                          <p>${data.cars[i].description}</p>
                        `

console.log(colDiv1);
    rowDiv.appendChild(colDiv1);
    mainDiv.appendChild(rowDiv)
    // rowDiv.appendChild(colDiv2);
    // rowDiv.appendChild(colDiv3);

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
