<?php
session_start();
$json = '
[
  {
    "id": "marketplace.php?topGarmentName=Henry_Tshirt",
    "name": "T-shirt",
    "pathImg": "resources/images/Tshirt.png",
    "price": "$19.99"
  },
  {
    "id": "marketplace.php?downGarmentName=Henry_Pants",
    "name": "Pant",
    "pathImg": "resources/images/Pants.png",
    "price": "$19.99"
  },
  {
    "id": "marketplace.php?topGarmentName=Henry_Male_Hoody",
    "name": "Hoody",
    "pathImg": "resources/images/Male_Hoody.png",
    "price": "$19.99"
  },
  {
    "id": "marketplace.php?topGarmentName=Henry_Garments1_Hana",
    "name": "Crop Top",
    "pathImg": "resources/images/Garments1_Hana.png",
    "price": "$19.99"
  },
  {
    "id": "marketplace.php?topGarmentName=Henry_Female_HalterneckDress",
    "name": "Dress",
    "pathImg": "resources/images/Female_HalterneckDress.png",
    "price": "$19.99"
  }
]
';

$products = json_decode($json, true);

$page = 0;
$sizePage = 12;
$maxPage = 1;
?>
<!DOCTYPE html>
<html lang="fr">

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
    integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
  <link rel="stylesheet" href="css/sidebar-filtre.css">
  <link rel="stylesheet" href="css/sidebar-nav.css">
  <link rel="stylesheet" href="css/search-bar.css">
  <link rel="stylesheet" href="css/card.css">
  <link rel="stylesheet" href="css/pagination.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/modal.css">

  <script src="js/script/logout.js"></script>
  <script src="js/script/loadModel.js"></script>

  <style>
    body {
      font-family: "Lato", sans-serif;
    }
  </style>
</head>

<body>

  <div class="row sidebar-filtre">
    <form action="" method="POST">
      <div class="col-12">
        <div class="row">
          <div>
            <h1>Filtre</h1>
          </div>
        </div>

        <div class="row">
          <label>Prix</label>
          <div style="text-align: center;">
            <select name="price" class="minimal">
            <option value="">Sélectionnez un prix</option>
              <option value="">< 20€</option>
              <option value="">< 40€</option>
              <option value="">< 60€</option>
              <option value="">< 80€</option>
              <option value="">< 100€</option>
              <option value="">> 100€</option>
            </select>
          </div>
        </div>
        
        <div class="row">
          <label>Type</label>
          <div style="text-align: center;">
            <select name="type" class="minimal">
              <option value="">Sélectionnez un type</option>
              <option value="">T-Shirts</option>
              <option value="">Pantalon</option>
            </select>
          </div>
        </div>

        <div class="row">
          <label>Taille</label>
          <div style="text-align: center;">
            <select name="size" class="minimal">
                <option value="">Sélectionnez une taille</option>
                <option value="">S</option>
                <option value="">M</option>
                <option value="">L</option>
                <option value="">XL</option>
                <option value="">XXL</option>
            </select>
          </div>
        </div>

        <div class="row">
          <label>Couleur</label>
          <div style="text-align: center;">
            <select name="color" class="minimal">
                <option value="">Sélectionnez une couleur</option>
                <option value="">S</option>
                <option value="">M</option>
                <option value="">L</option>
                <option value="">XL</option>
                <option value="">XXL</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div style="text-align: center;">
            <button class="col-10 button-size-active">Appliquer</button>
          </div>
        </div>

      </div>
    </form>
  </div>

  <div class="sidebar-nav">
    <a href="#"><img src="assets/images/logo.svg" alt="" srcset=""></a>
    <a href="index.php"><svg width="50" height="50" viewBox="0 0 512 512"><path fill="currentColor" d="M320 64c0-35.3-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64s64-28.7 64-64zm-96 96c-35.3 0-64 28.7-64 64v48c0 17.7 14.3 32 32 32h1.8l11.1 99.5c1.8 16.2 15.5 28.5 31.8 28.5h38.7c16.3 0 30-12.3 31.8-28.5l11-99.5h1.8c17.7 0 32-14.3 32-32v-48c0-35.3-28.7-64-64-64h-64zm-91.7 234.2c13-2.4 21.7-14.9 19.3-27.9s-14.9-21.7-27.9-19.3c-32.4 5.9-60.9 14.2-82 24.8c-10.5 5.3-20.3 11.7-27.8 19.6C6.4 399.5 0 410.5 0 424c0 21.4 15.5 36.1 29.1 45c14.7 9.6 34.3 17.3 56.4 23.4C130.2 504.7 190.4 512 256 512s125.8-7.3 170.4-19.6c22.1-6.1 41.8-13.8 56.4-23.4c13.7-8.9 29.1-23.6 29.1-45c0-13.5-6.4-24.5-14-32.6c-7.5-7.9-17.3-14.3-27.8-19.6c-21-10.6-49.5-18.9-82-24.8c-13-2.4-25.5 6.3-27.9 19.3s6.3 25.5 19.3 27.9c30.2 5.5 53.7 12.8 69 20.5c3.2 1.6 5.8 3.1 7.9 4.5c3.6 2.4 3.6 7.2 0 9.6c-8.8 5.7-23.1 11.8-43 17.3C374.3 457 318.5 464 256 464s-118.3-7-157.7-17.9c-19.9-5.5-34.2-11.6-43-17.3c-3.6-2.4-3.6-7.2 0-9.6c2.1-1.4 4.8-2.9 7.9-4.5c15.3-7.7 38.8-14.9 69-20.5z"/></svg></a>
    <a href="marketplace.php"><svg class="active" width="50" height="50" viewBox="0 0 576 512"><path fill="currentColor" d="M24 0C10.7 0 0 10.7 0 24s10.7 24 24 24h52.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5h328c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zm152 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"/></svg></a>
    <div class="sidebar-nav-bottom">
      <div class="dropdown">
        <a href="account.php"><svg width="50" height="50" viewBox="0 0 448 512">
            <path fill="currentColor"
              d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7c0-98.5-79.8-178.3-178.3-178.3h-91.4z" />
          </svg></a>
        <div class="dropdown-content">
          <a onclick="remove()">Se déconnecter</a>
        </div>
      </div>
      <a href="settings.php"><svg width="50" height="50" viewBox="0 0 512 512"><path fill="currentColor" d="M495.9 166.6c3.2 8.7.5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4l-55.6 17.8c-8.8 2.8-18.6.3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4c-1.1-8.4-1.7-16.9-1.7-25.5s.6-17.1 1.7-25.4l-43.3-39.4c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z"/></svg></a>
    </div>
  </div>

  <div class="row main">
    <div>
      <form class="search-bar" action="">
        <input type="text" placeholder="Rechercher un article...">
        <button type="submit"><svg width="30" height="30" viewBox="0 0 512 512"><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208zM208 352c79.5 0 144-64.5 144-144S287.5 64 208 64S64 128.5 64 208s64.5 144 144 144z"/></svg></button>
      </form>
    </div>

    <div id="myModal" class="modal">

      <!-- Modal content -->
      <div class="modal-content">
        <span class="close" onclick="closeModal()">&times;</span>
        <canvas id="c"></canvas>
        <button onclick="closeModal()" class="button-size-active">Ajouter à mes favoris</button>
      </div>

    </div>

    <?php
    foreach ($products as $product) {
    ?>
    
    <div class="col-4 card">
      <button onclick='removeGarments(); location.href="<?php echo($product["id"]) ?>";'>
        <img
          src="<?php echo($product["pathImg"]) ?>"
          alt="<?php echo($product["name"]) ?>" style="width:100%">
        <h1><?php echo($product["name"]) ?></h1>
        <p class="price"><?php echo($product["price"]) ?></p>
      </button>
    </div>
    
    <?php
    }
    ?>

    <div class="row pagination">
      <div class="col-12">
        
        <?php
        if ($page > 0) {
          ?>
          <a href="#"><svg width="20" height="20" viewBox="0 0 512 512"><path fill="currentColor" d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3v83.4l171.5 142.9zM256 352V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29v-64z"/></svg></a>
          <?php
        }
        for ($i=0; $i < $maxPage; $i++) { 
          if ($i == $page) {
            ?>
            <a class="active" href="#"><?php echo($i + 1) ?></a>
            <?php
          } else {
            ?>
            <a href="#"><?php echo($i + 1) ?></a>
            <?php
          }
        }
        if ($page + 1 < $maxPage) {
          ?>
          <a href="#"><svg width="20" height="20" viewBox="0 0 512 512"><path fill="currentColor" d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4L224 214.3v83.4L52.5 440.6zM256 352V96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4S256 428.4 256 416v-64z"/></svg></a>
          <?php
        }
        ?>
        </div>
    </div>

  </div>
  <script src="js/node_modules/three/build/three.js"></script>
  <script src="js/node_modules/three/examples/js/controls/OrbitControls.js"></script>
  <script src="js/node_modules/three/examples/js/loaders/MTLLoader.js"></script>
  <script src='js/node_modules/three/examples/js/loaders/GLTFLoader.js'></script>
  <script src="js/node_modules/three/examples/js/loaders/OBJLoader.js"></script>
  <script src="js/node_modules/three/examples/js/loaders/FBXLoader.js"></script>
  <script src="js/node_modules/three/src/animation/AnimationMixer.js"></script>
  <script src="js/node_modules/three/src/animation/AnimationClip.js"></script>
  <script src="js/script/script.js"></script>
  <script>
// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
var openModal = function() {
  modal.style.display = "block";
}
<?php
if (isset($_REQUEST['topGarmentName']) || isset($_REQUEST['downGarmentName'])) {
  echo 'openModal()';
}
?>
// When the user clicks on <span> (x), close the modal
var closeModal = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
</script>


</body>

</html>