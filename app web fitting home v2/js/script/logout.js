function remove() {
    if (localStorage.getItem("jwt"))
        window.localStorage.removeItem("jwt")
    location.href = "login.php"
}