function resizeNav() {
  if (document.getElementById('sidebar-details').style.right != "-250px" ) {
    document.getElementById('sidebar-details').style.right = "-250px";
    document.getElementById('sidebar-favoris').style.left = "-350px";
    document.getElementById('screen-size').style.right = "0px";
    document.getElementById('screen-compress').hidden = false;
    document.getElementById('screen-expand').hidden = true;
  } else {
    document.getElementById('sidebar-details').style.right = "0px";
    document.getElementById('sidebar-favoris').style.left = "100px";
    document.getElementById('screen-size').style.right = "250px";
    document.getElementById('screen-compress').hidden = true;
    document.getElementById('screen-expand').hidden = false;
  }
}

function moveSidebarLeft() {
  if (document.getElementById('sidebar-favoris').style.display != "none" ) {
    document.getElementById('sidebar-favoris').style.display = "none";
  } else {
    document.getElementById('sidebar-favoris').style.display = "block";
    document.getElementById('sidebar-details').style.display = "none";
  }
}

function moveSidebarRight() {
  if (document.getElementById('sidebar-details').style.display != "none" ) {
    document.getElementById('sidebar-details').style.display = "none";
  } else {
    document.getElementById('sidebar-details').style.display = "block";
    document.getElementById('sidebar-favoris').style.display = "none";
  }
}