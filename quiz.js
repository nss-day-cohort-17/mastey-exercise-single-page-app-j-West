


var mainDiv = document.querySelector(".container")



function populatePage(data) {

  }
}


function loadInventory() {
  let myRequest = new XMLHttpRequest();

  myRequest.addEventListener("load", function(e) {
    var data = JSON.parse(e.target.responseText)
    console.log(data)
    populatePage(data)
  });
  myRequest.open("GET", "inventory.json")
  myRequest.send();
}

loadInventory();
