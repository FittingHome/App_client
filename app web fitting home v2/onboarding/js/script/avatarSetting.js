var age = document.querySelector("#numberAge");

age.addEventListener("input", restrictNumber);
function restrictNumber(e) {
  var newValue = this.value.replace(new RegExp(/[^\d]/, "ig"), "");
  this.value = newValue;
}
var size = document.querySelector("#numberSize");

size.addEventListener("input", restrictNumber);
function restrictNumber(e) {
  var newValue = this.value.replace(new RegExp(/[^\d]/, "ig"), "");
  this.value = newValue;
}

var weight = document.querySelector("#numberWeight");

weight.addEventListener("input", restrictNumber);
function restrictNumber(e) {
  var newValue = this.value.replace(new RegExp(/[^\d]/, "ig"), "");
  this.value = newValue;
}

console.log(document.querySelector("numberAge").value);
