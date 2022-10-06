const url = "http://api.fittinghome.fr/user/connect";

var jwt = localStorage.getItem("jwt");
if (jwt != null) {
  window.location.href = '../../index.html'
}
console.log(jwt)

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email, password)
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", url);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "email": email,
    "password": password
  }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      console.log("obj", objects);
      window.location.href = '../../index.html'
      localStorage.setItem("jwt", objects['id']);

      // if (objects['status'] == 'ok') {
      //   alert("login")
      //   localStorage.setItem("jwt", objects['accessToken']);
      // } else {
      //  console.log("error")
      // }
    }
  };
  return false;
}
