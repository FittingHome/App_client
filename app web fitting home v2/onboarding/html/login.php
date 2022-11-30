<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Fitting Home</title>
    <link rel="stylesheet" href="../css/form.css">
</head>

<body>

    <div class="parent clearfix">
        <div class="bg-illustration">
        </div>
        <div class="login">
          <div class="container">
            <h1 class="title">Connexion</h1>
            <h2>FittingHome, le mannequin c’est vous !
            </h2>
        
            <div class="login-form">
              <form onsubmit="return login()" action="">
                <label for="email"><b>Email</b></label>
                <input type="email" id="email"  placeholder="E-mail Address" >
                <label for="psw"><b>Mot de passe</b></label>
                <input type="password" id="password" placeholder="Password">
                <!-- <div class="remember-form">
                  <input type="checkbox">
                  <span>Remember me</span>
                </div> -->
                <div class="forget-pass">
                  <a href="forgot-password.php">Forgot Password ?</a>
                </div>
    
              
                <div class="btn_form">
                  <button type="submit">Se connecter</button>
                  <a class="button" href="signup.php" ><p class="btn_text">S'inscrire</p></a>
                          
                </div>
              </form>
            </div>
        
          </div>
          </div>
      </div>
    <script src="../js/script/login.js"></script>
</body>

</html>
