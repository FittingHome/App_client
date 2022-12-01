function remove() {
  if (localStorage.getItem("jwt")) window.localStorage.removeItem("jwt");
  window.location.href = "../onboarding/html/login.php";
}
