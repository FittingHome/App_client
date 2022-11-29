const url = "http://api.fittinghome.fr/user/create";

var jwt = localStorage.getItem("jwt");
if (jwt != null) {
  console.log(jwt)
  window.location.href = '../onboarding/avatar_settings.html'
}

function register() {
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
      console.log("obj",objects);
      window.location.href = '../onboarding/avatar_settings.html'
      localStorage.setItem("jwt", objects['id']);
      console.log(objects)
      // if (objects['status'] == 'ok') {
      //   alert("subscribed")
      //   localStorage.setItem("jwt", objects['accessToken']);
      // } else {
      //  console.log("error")
      // }
    }
  };
  return false;
}

// function ValidateEmail(inputText)
// {
//   var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//   if(inputText.value.match(mailformat)) {
//       alert("Valid email address!");
//       document.form1.text1.focus();
//       return true;
//     } else {
//       alert("You have entered an invalid email address!");
//       document.form1.text1.focus();
//       return false;
//   }
// }
