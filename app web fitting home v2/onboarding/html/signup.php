<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Fitting Home</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/form.css">
</head>
<body>
    <div class="parent clearfix">
        <div class="bg-illustration">
        </div>
        
        <div class="login">
          <div class="container">
            <h1 class="title">Inscription</h1>
            <h2>FittingHome, le mannequin c’est vous !</h2>
        
            <div class="login-form" id="main">
              <form onsubmit="return register()" action="">
                <div class="name_form">
                    <div class="name_item">
                        <label for="name"><b>Prénom et Nom</b></label>
                        <input type="name" id="name"  placeholder="Henri Dubois" >
                    </div>
                    <div class="name_item2">
                        <label for="nickname"><b>Nom d'utilisateur *</b></label>
                        <input type="name" id="nickname"  placeholder="Henridu92" >
                    </div>
                </div>
                <label for="email"><b>Email *</b></label>
                <input type="text" id="email" placeholder="hdubois@gmail.com" name="email" required >
                <label for="psw"><b>Mot de passe</b></label>
                <input type="password" id="password" placeholder="******" name="psw" required>
    
                <!-- <button type="submit" href="avatar_settings.html">S'inscrire</button> -->
                <div class="btn_form">
                    <button type="submit">S'inscrire</button>

                    <!-- <button type="submit">S'inscrire</button> -->
                    <a class="link-login" href="login.php">Deja un compte ?</a>
                </div>
              </form>
            </div>
        
          </div>
          </div>
      </div>
</body>
<script src="../js/script/register.js"></script>
<script src="../js/script/getClothes.js"></script>



</html>