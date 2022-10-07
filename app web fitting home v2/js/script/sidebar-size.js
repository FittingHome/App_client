function resizeNav() {
  if (document.getElementById('sidebar-details').style.right != "-350px" ) {
    document.getElementById('sidebar-details').style.right = "-350px";
    document.getElementById('sidebar-favoris').style.left = "-350px";
    document.getElementById('screen-size').style.right = "100px";
    document.getElementById('screen-compress').hidden = false;
    document.getElementById('screen-expand').hidden = true;
  } else {
    document.getElementById('sidebar-details').style.right = "100px";
    document.getElementById('sidebar-favoris').style.left = "0px";
    document.getElementById('screen-size').style.right = "350px";
    document.getElementById('screen-compress').hidden = true;
    document.getElementById('screen-expand').hidden = false;
  }
}
