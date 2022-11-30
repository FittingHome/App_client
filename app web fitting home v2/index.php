<?php
session_start();

$json = '
[
  {
    "id": "Tshirt",
    "name": "T-shirt",
    "pathImg": "resources/images/Tshirt.png",
    "price": "$19.99",
    "size": ["S"],
    "type": "top"
  },
  {
    "id": "Pants",
    "name": "Pant",
    "pathImg": "resources/images/Pants.png",
    "price": "$19.99",
    "size": ["S", "M", "L"],
    "type": "down"
  },
  {
    "id": "hoodie",
    "name": "Hoody",
    "pathImg": "resources/images/Male_Hoody.png",
    "price": "$19.99",
    "size": ["S", "M", "L"],
    "type": "top"
  },
  {
    "id": "Garments1_Hana",
    "name": "Crop Top",
    "pathImg": "resources/images/Garments1_Hana.png",
    "price": "$19.99",
    "size": ["S"],
    "type": "top"
  },
  {
    "id": "Female_HalterneckDress",
    "name": "Dress",
    "pathImg": "resources/images/Female_HalterneckDress.png",
    "price": "$19.99",
    "size": ["S"],
    "type": "top"
  }
]
';
$_SESSION['favorites'] = json_decode($json, true);
$favorites = $_SESSION['favorites'];

$selectedItem = "top";
$selectedSize = "M";
$selectedGarments = [];

if (isset($_REQUEST["deleted"])) {
  $_SESSION["garments"]["top"] = null;
}

if (isset($_REQUEST["size"])) {
  $selectedSize = $_REQUEST["size"];
}

if (isset($_REQUEST["item"])) {
  $selectedItem = $_REQUEST["item"];
  if (isset($_SESSION["garments"][$selectedItem])) {
    $selectedGarments = $_SESSION["garments"][$selectedItem];
  }
}

if (isset($_REQUEST["garment"])) {
  foreach ($favorites as $value) {
    if ($value["id"] == $_REQUEST["garment"]) {
      $selectedGarments = $_SESSION["garments"];
      $selectedGarments[$value["type"]] = $value;
      $_SESSION["garments"] = $selectedGarments;
      $selectedItem = $value["type"];
      $selectedGarments = $value;
    }
  }
}

?>
<!DOCTYPE html>
<html lang="fr">

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
    integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
  <link rel="stylesheet" href="css/sidebar-nav.css">
  <link rel="stylesheet" href="css/sidebar.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/card.css">
  <link rel="stylesheet" href="css/screen-size.css">
  <link rel="stylesheet" href="css/pill-nav.css">
  <link rel="stylesheet" href="css/search-bar.css">
  <link rel="stylesheet" href="css/bar-button.css">

  <script src="js/script/sidebar-size.js"></script>
  
  <script src="js/script/filter.js"></script>
  <script src="js/script/logout.js"></script>
  <script src="js/script/menu.js"></script>
  <style>
    body {
      font-family: "Lato", sans-serif;
    }
  </style>
</head>

<body>

  <div id="sidebar-favoris" class="row sidebar">
    <div class="col-12">

      <div class="row">
        <div>
          <h1>Mes favoris</h1>
        </div>
      </div>

      <div style="margin: 10px; padding-left: 10px;">
      <div class="search-bar">
        <input type="text" id="myInput" onkeyup="filterFavoris()" placeholder="Rechercher un produit">
      </div>
      </div>

      <ul id="myUL">
      <?php
      foreach ($favorites as $favorite) {
      ?>
        <li>
          <div class="col-12" style="margin: 10px;">
            <div class="card">
              <button onclick='location.href="<?php echo("index.php?garment=" . $favorite["id"] . "&size=S") ?>"'>
                <img src="<?php echo($favorite["pathImg"]) ?>" alt="<?php echo($favorite["name"]) ?>" style="width:100%">
                <h1><?php echo($favorite["name"]) ?></h1>
                <p class="price"><?php echo($favorite["price"]) ?></p>
              </button>
            </div>
          </div>
        </li>
      <?php
      }
      ?>
      </ul>
    </div>
  </div>

  <div id="screen-size" class="screen-size">
    <span id="screen-expand" onclick="resizeNav();"><svg width="30" height="30" viewBox="0 0 448 512">
        <path fill="currentColor"
          d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zm32 320c0-17.7-14.3-32-32-32S0 334.3 0 352v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64v-64zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32h-96zm128 320c0-17.7-14.3-32-32-32s-32 14.3-32 32v64h-64c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32v-96z" />
      </svg></span>
    <span id="screen-compress" hidden onclick="resizeNav();"><svg width="30" height="30" viewBox="0 0 448 512">
        <path fill="currentColor"
          d="M160 64c0-17.7-14.3-32-32-32S96 46.3 96 64v64H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V64zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32v-96c0-17.7-14.3-32-32-32H32zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32h-64V64zm-32 256c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32v-64h64c17.7 0 32-14.3 32-32s-14.3-32-32-32h-96z" />
      </svg></span>
  </div>

  <div id="sidebar-details" class="sidebar-right">
    <div class="pill-nav">
      <a class="<?php if ($selectedItem == "top") { echo("active"); } ?>" href="index.php?item=top"><svg width="40" height="32" viewBox="0 0 640 512">
          <path fill="currentColor"
            d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3l126.2 105.1c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z" />
        </svg></a>
      <a class="<?php if ($selectedItem == "down") { echo("active"); } ?>" href="index.php?item=down"><svg width="25" height="25" viewBox="0 0 512 512">
          <path fill="currentColor"
            d="M175.2 476.6c-9.7-18-15.2-38.7-15.2-60.6c0-40.3 19-78.2 51.2-102.4l64-48c8.1-6 12.8-15.5 12.8-25.6V96H128v144c0 20.1-9.5 39.1-25.6 51.2l-64 48C14.2 357.3 0 385.8 0 416c0 53 43 96 96 96c20.8 0 41-6.7 57.6-19.2l21.6-16.2zM128 64h160V48c0-14.5 3.9-28.2 10.7-39.9C291 3 281.9 0 272 0h-96c-26.5 0-48 21.5-48 48v16zm192 32v144c0 20.1-9.5 39.1-25.6 51.2l-64 48C206.2 357.3 192 385.8 192 416c0 53 43 96 96 96c20.8 0 41-6.7 57.6-19.2l115.2-86.4C493 382.2 512 344.3 512 304V96H320zm192-32V48c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v16h192z" />
        </svg></a>
      <a class="<?php if ($selectedItem == "head") { echo("active"); } ?>" href="index.php?item=head"><svg width="25" height="25" viewBox="0 0 640 512">
          <path fill="currentColor"
            d="M320 64c14.4 0 22.3-7 30.8-14.4C360.4 41.1 370.7 32 392 32c49.3 0 84.4 152.2 97.9 221.9c-42.1 18.2-99 34.1-169.9 34.1s-127.8-15.9-169.9-34.1C163.6 184.2 198.7 32 248 32c21.3 0 31.6 9.1 41.2 17.6C297.7 57 305.6 64 320 64zM111.1 270.7c47.2 24.5 117.5 49.3 209 49.3s161.8-24.8 208.9-49.3c24.8-12.9 49.8-28.3 70.1-47.7c7.9-7.9 20.2-9.2 29.6-3.3c9.5 5.9 13.5 17.9 9.9 28.5c-13.5 37.7-38.4 72.3-66.1 100.6C523.7 398.9 443.6 448 320 448s-203.6-49.1-252.5-99.2c-27.7-28.4-52.6-63-66.1-100.7c-3.6-10.6.4-22.6 9.9-28.5c9.5-5.9 21.7-4.5 29.6 3.3c20.4 19.4 45.3 34.8 70.1 47.7z" />
        </svg></a>
      <a class="<?php if ($selectedItem == "feet") { echo("active"); } ?>" href="index.php?item=feet"><svg width="25" height="25" viewBox="0 0 640 512">
          <path fill="currentColor"
            d="M416 0c-63.7 0-160 32-160 32v128c48 0 76 16 104 32s56 32 104 32c56.4 0 176-16 176-96S512 0 416 0zM128 96c0 35.3 28.7 64 64 64h32V32h-32c-35.3 0-64 28.7-64 64zm160 416c96 0 224-48 224-128s-119.6-96-176-96c-48 0-76 16-104 32s-56 32-104 32v128s96.3 32 160 32zM0 416c0 35.3 28.7 64 64 64h32V352H64c-35.3 0-64 28.7-64 64z" />
        </svg></a>
    </div>

    <div class="row">
      <label>Taille</label>
      <div style="text-align: center;">
      <?php
      if (sizeof($selectedGarments) > 0) {
        foreach ($selectedGarments["size"] as $size) {
          $activeClassSize = "col-4 button-size";
          if ($selectedSize == $size) {
            $activeClassSize = "col-4 button-size-active";
          }
      ?>
        <button onclick='location.href="index.php?garment=" + "<?php echo($selectedGarments["id"]) ?>" + "&size=" + "<?php echo($size) ?>"' class="<?php echo($activeClassSize) ?>"><?php echo($size) ?></button>
      <?php
        }
      }
      ?>
      </div>
    </div>

    <!-- <div class="row">
      <label>Couleur</label>
      <div style="text-align: center;">
        <button class="col-2 button-color" style="background: red;"></button>
        <button class="col-2 button-color" style="background: purple;"></button>
        <button class="col-2 button-color" style="background: peru;"></button>
        <button class="col-2 button-color" style="background: blue;"></button>
        <button class="col-2 button-color-active" style="background: yellow;"></button>
      </div>
    </div> -->

    <div class="row">
      <div class="col-12" style="text-align: center;">
        <button class="btn btn-default border-button" onclick='removeGarments(); location.href="index.php?deleted=true"'>Effacer</button>
      </div>
    </div>
  </div>

  <div class="sidebar-nav">
    <a href="#"><img src="assets/images/logo.svg" alt="" srcset=""></a>
    <a href="index.php"><svg class="active" width="50" height="50" viewBox="0 0 512 512">
        <path fill="currentColor"
          d="M320 64c0-35.3-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64s64-28.7 64-64zm-96 96c-35.3 0-64 28.7-64 64v48c0 17.7 14.3 32 32 32h1.8l11.1 99.5c1.8 16.2 15.5 28.5 31.8 28.5h38.7c16.3 0 30-12.3 31.8-28.5l11-99.5h1.8c17.7 0 32-14.3 32-32v-48c0-35.3-28.7-64-64-64h-64zm-91.7 234.2c13-2.4 21.7-14.9 19.3-27.9s-14.9-21.7-27.9-19.3c-32.4 5.9-60.9 14.2-82 24.8c-10.5 5.3-20.3 11.7-27.8 19.6C6.4 399.5 0 410.5 0 424c0 21.4 15.5 36.1 29.1 45c14.7 9.6 34.3 17.3 56.4 23.4C130.2 504.7 190.4 512 256 512s125.8-7.3 170.4-19.6c22.1-6.1 41.8-13.8 56.4-23.4c13.7-8.9 29.1-23.6 29.1-45c0-13.5-6.4-24.5-14-32.6c-7.5-7.9-17.3-14.3-27.8-19.6c-21-10.6-49.5-18.9-82-24.8c-13-2.4-25.5 6.3-27.9 19.3s6.3 25.5 19.3 27.9c30.2 5.5 53.7 12.8 69 20.5c3.2 1.6 5.8 3.1 7.9 4.5c3.6 2.4 3.6 7.2 0 9.6c-8.8 5.7-23.1 11.8-43 17.3C374.3 457 318.5 464 256 464s-118.3-7-157.7-17.9c-19.9-5.5-34.2-11.6-43-17.3c-3.6-2.4-3.6-7.2 0-9.6c2.1-1.4 4.8-2.9 7.9-4.5c15.3-7.7 38.8-14.9 69-20.5z" />
      </svg></a>
    <a href="marketplace.php"><svg width="50" height="50" viewBox="0 0 576 512">
        <path fill="currentColor"
          d="M24 0C10.7 0 0 10.7 0 24s10.7 24 24 24h52.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5h328c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zm152 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z" />
      </svg></a>
    <div class="sidebar-nav-bottom">
      <div class="dropdown">
        <a href="account.php"><svg width="50" height="50" viewBox="0 0 448 512">
            <path fill="currentColor"
              d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7c0-98.5-79.8-178.3-178.3-178.3h-91.4z" />
          </svg>
        </a>
        <div class="dropdown-content">
          <a onclick="remove()">Se déconnecter</a>
        </div>
      </div>
        <a href="settings.php"><svg width="50" height="50" viewBox="0 0 512 512">
            <path fill="currentColor"
              d="M495.9 166.6c3.2 8.7.5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4l-55.6 17.8c-8.8 2.8-18.6.3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4c-1.1-8.4-1.7-16.9-1.7-25.5s.6-17.1 1.7-25.4l-43.3-39.4c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z" />
          </svg>
        </a>
    </div>
    <div id="myLinks" class="menu">
      <a href="index.php">Mon dressing</a>
      <a href="marketplace.php">Boutique</a>
      <a href="account.php">Mon compte</a>
      <a href="settings.php">Paramètres</a>
      <a onclick="remove()"><svg width="32" height="32" viewBox="0 0 512 512"><path fill="currentColor" d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32v224c0 17.7 14.3 32 32 32s32-14.3 32-32V32zm-144.5 88.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"/></svg></a>
    </div>
    <a href="javascript:void(0);" class="icon" onclick="openMenu()">
      <i class="fa fa-bars"></i>
    </a>
  </div>

  <div class="bar-button-bottom">
    <button onclick="moveSidebarLeft()"><svg width="40" height="32" viewBox="0 0 640 512"><path fill="currentColor" d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3l126.2 105.1c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z"/></svg></button>
    <button onclick="location.href='ARView.php'">AR</button>
    <button onclick="moveSidebarRight()"><svg width="32" height="32" viewBox="0 0 512 512"><path fill="currentColor" d="M0 416c0-17.7 14.3-32 32-32h54.7c12.3-28.3 40.5-48 73.3-48s61 19.7 73.3 48H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H233.3c-12.3 28.3-40.5 48-73.3 48s-61-19.7-73.3-48H32c-17.7 0-32-14.3-32-32zm192 0c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zm192-160c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zm-32-80c32.8 0 61 19.7 73.3 48H480c17.7 0 32 14.3 32 32s-14.3 32-32 32h-54.7c-12.3 28.3-40.5 48-73.3 48s-61-19.7-73.3-48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h246.7c12.3-28.3 40.5-48 73.3-48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32s-14.3-32-32-32zm73.3 0H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H265.3c-12.3 28.3-40.5 48-73.3 48s-61-19.7-73.3-48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h86.7C131 35.7 159.2 16 192 16s61 19.7 73.3 48z"/></svg></button>
  </div>

  <div class="main" style="position: fixed;">
    <canvas id="c"></canvas>
  </div>

  <script>
    let name = "Henry";//localStorage.getItem('modelName');

    if ("<?php echo($selectedItem) ?>" == "top") {
      localStorage.setItem('topGarmentName', name + "<?php echo('_' . $_SESSION["garments"]["top"]["id"] . '_' . $selectedSize) ?>");
    }
    if ("<?php echo($selectedItem) ?>" == "down") {
      localStorage.setItem('downGarmentName', name + "<?php echo('_' . $_SESSION["garments"]["down"]["id"] . '_' . $selectedSize) ?>");
    }

  </script>
  <script src="js/script/loadModel.js"></script>
  <script src="js/node_modules/three/build/three.js"></script>
  <script src="js/node_modules/three/examples/js/controls/OrbitControls.js"></script>
  <script src="js/node_modules/three/examples/js/loaders/MTLLoader.js"></script>
  <script src='js/node_modules/three/examples/js/loaders/GLTFLoader.js'></script>
  <script src="js/node_modules/three/examples/js/loaders/OBJLoader.js"></script>
  <script src="js/node_modules/three/examples/js/loaders/FBXLoader.js"></script>
  <script src="js/node_modules/three/src/animation/AnimationMixer.js"></script>
  <script src="js/node_modules/three/src/animation/AnimationClip.js"></script>
  <script src="js/script/script.js"></script>
</body>

</html>