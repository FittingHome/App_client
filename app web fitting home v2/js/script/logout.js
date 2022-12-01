function remove() {
  if (localStorage.getItem("jwt")) {
    window.localStorage.removeItem("jwt")
  }
  location.href = "../../onboarding/html/login.php";
}
