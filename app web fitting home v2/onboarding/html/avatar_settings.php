<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Fitting Home</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/form2.css">
    <link rel="stylesheet" href="../css/loading.css">
    <link rel="stylesheet" href="../css/image.css">
    <script src="https://r105.threejsfundamentals.org/threejs/resources/threejs/r105/three.min.js"></script>
    <script src="https://r105.threejsfundamentals.org/threejs/resources/threejs/r105/js/controls/OrbitControls.js"></script>
    <script src="https://r105.threejsfundamentals.org/threejs/resources/threejs/r105/js/loaders/LoaderSupport.js"></script>
    <script src="https://r105.threejsfundamentals.org/threejs/resources/threejs/r105/js/loaders/OBJLoader2.js"></script>
</head>
<body>
    <div class="parent clearfix">
        <div id="load" class="trigger" style="visibility: hidden;"></div>
            <canvas class="iframewrapper" id="c"></canvas>
        <div class="login">
          <div class="container2">
            <h1 class="title2">Création de profil</h1>
            <div class="login-form">
              <form onsubmit="return login()" action="">
                <div class="name_form">
                    <div class="name_item">
                        <label for="sexe"><b>Sexe</b></label>
                        <select name="sexe" id="sexe" onchange="defineGender(this)">
                            <option value="femme">Femme</option>
                            <option value="homme">Homme</option>
                        </select> 
                    </div>
                    <div class="name_item">
                        <label for="age"><b>Age</b></label>
                        <input name="myinput_drs" oninput="maxLengthCheck(this)" type="number" maxlength="2" min="12" max="99" id="numberAge" placeholder="Age" />
                    </div>
                </div>
                <div class="name_form">
                    <div class="name_item">
                        <label for="size"><b>Taille (cm)</b></label>
                        <input name="myinput_drs" oninput="maxLengthCheck(this)" type="number" maxlength="3" min="110" max="250" id="numberSize"  placeholder="Taille" >
                    </div>
                    <div class="name_item">
                        <label for="weight"><b>Poids (kg)</b></label>
                        <input name="myinput_drs" oninput="maxLengthCheck(this)" type="number" maxlength="3" min="30" max="160"  id="numberWeight"  placeholder="Poids" >
                    </div>
                </div>
                <label><b class="txt">Morphologie</b></label>
                <div class="buttons morpho_manager">
                    <div class="morph">
                        <a class="morpho-1" onclick="defineMorpho('triangle')">
                            <i class="fa icon-sort-desc shown"></i>
                            <i class="fa icon-sort-desc_select hidden"></i>
                        </a>
                    </div>
                    <div class="morph">
                        <a class="morpho-2" onclick="defineMorpho('circle')">
                            <i class="fa circle-icon shown"></i>
                            <i class="fa circle-icon_select hidden"></i>
                        </a>
                    </div>
                    <div class="morph">
                        <a class="morpho-3" onclick="defineMorpho('cube')">
                            <i class=" fa rectangle-icon shown"></i>
                            <i class=" fa rectangle-icon_select hidden"></i>
                        </a>
                    </div>
                </div>
                <script>
                </script>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
                <script>
                    $('.morpho_manager a').click(function () {
                            $('.buttons a').removeClass('selected');
                            $('.buttons a i').removeClass('icon-sort-desc_select circle-icon_select rectangle-icon_select');
                            $('.buttons a.morpho-1 i').addClass('icon-sort-desc');
                            $('.buttons a.morpho-2 i').addClass('circle-icon');
                            $('.buttons a.morpho-3 i').addClass('rectangle-icon');
                            $(this).addClass('selected');
                            if ($(this).hasClass('morpho-1')) {
                                $(this).find("i").toggleClass("icon-sort-desc icon-sort-desc_select");
                            } else if ($(this).hasClass('morpho-2')) {
                                $(this).find("i").toggleClass("circle-icon circle-icon_select");
                            } else if ($(this).hasClass('morpho-3')) {
                                $(this).find("i").toggleClass("rectangle-icon rectangle-icon_select");
                            }
                        })
                </script>

            <div class="btn-div">
                <div class="btn_form">
                    <a class="button" onclick="prevMorpho()" >
                        <p class="btn_text">Présvisualisation</p>
                    </a>
                </div>
                <div class="btn_form">
                    <a class="button" id="myBtn" ><p class="btn_text">Continuer</p></a>
                </div>
            </div>
              </form>
            <!-- The Modal -->
            </div>
            </div>
            <div id="myModal" class="modal">
                <!-- Modal content -->
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h1 class="modal_title">Être plus précis</h1>
                        <div class="grid-container" id="img_grid"></div>
                    <a class="button button-modal" href="/index.php">
                        <p class="btn_text ">Confirmer</p>
                    </a>
                </div>
                <script>
                    const images = ["http://placekitten.com/400/307", "http://placekitten.com/200/100", "http://placekitten.com/402/300", "http://placekitten.com/440/300", "http://placekitten.com/400/300", "http://placekitten.com/400/300", "http://placekitten.com/400/300", "http://placekitten.com/400/300"];
                    const myHtml = images.map(function (path) {
                        return '<img class="grid-item" src="' + path + '">';
                    }).join('');
                    
                        document.getElementById('img_grid').innerHTML = myHtml;
                </script>
            </div>
            <script>
                const pict = document.getElementById('img_grid');

                pict.addEventListener('click', function onClick(event) {
                console.log(event.target.style.backgroundColor);
                pict.style.backgroundColor = 'salmon';

                // 👇️ change background color

                // 👇️ optionally change text color
                // event.target.style.color = 'white';
                });
                var modal = document.getElementById("myModal");
                var btn = document.getElementById("myBtn");
                var span = document.getElementsByClassName("close")[0];
                    btn.onclick = function () {
                        modal.style.display = "block";
                    }
                    span.onclick = function () {
                        modal.style.display = "none";
                    }
                    window.onclick = function (event) {
                        if (event.target == modal) {
                            modal.style.display = "none";
                        }
                    }
            </script>
          </div>
        </div>
    </body>
    <script src="../js/script/avatarSetting.js"></script>
    <script src="../js/script/modelDisplay.js"></script>
</html>