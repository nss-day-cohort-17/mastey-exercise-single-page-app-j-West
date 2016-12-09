
function populatePage(data) {

}

function loadInventory() {
  var myRequest = new XMLHttpRequest();

  myRequest.addEventListener("load", (e) => {
    var data = JSON.parse(e.target.responseText)
    console.log(data);

  });
  myRequest.open("GET", "inventory.json")
  myRequest.send();
}

loadInventory();
