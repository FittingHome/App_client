const url = "http://api.fittinghome.fr/user/create";

var jwt = localStorage.getItem("jwt");
if (jwt != null) {
  window.location.href = '/app%20web%20fitting%20home/clothes.html'
}

function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email)
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
      console.log(objects);
      window.location.href = '/app%20web%20fitting%20home/clothes.html'

      if (objects['status'] == 'ok') {
        alert("subscribed")
        localStorage.setItem("jwt", objects['accessToken']);
      } else {
       console.log("error")
      }
    }
  };
  return false;
}