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
            <h1 class="title3">Oublie de mot de passe</h1>
            <div class="login-form">
              <form onsubmit="return login()" action="">
                <label for="email"><b>Si l'email correspond à un compte existant, vous allez recevoir un lien pour créer un nouveau mot de passe.</b></label>
                <input type="text" placeholder="Entrez votre email" name="email" required>
                <div class="btn_form">
                  <!-- <button >Envoyer l'email</button> -->
                  <a class="button" href="new-password.php"><p class="btn_text">Envoyer l'email</p></a>

              </div>
              </form>
            </div>
        
          </div>
          </div>
      </div>
    <!-- Add all page content inside this div if you want the side nav to push page content to the right (not used if you only want the sidenav to sit on top of the page -->
    <div class="" id="main">
        <form action="action_page.php" method="post">
            <div class="container">
                <label for="email"><b>Si l'email correspond à un compte existant, vous allez recevoir un lien pour créer un nouveau mot de passe.</b></label>
                <input type="text" placeholder="Entrez votre email" name="email" required>

                <button type="submit" onclick="sendEmail();">Envoyer</button>


            </div>
        </form>
    </div>
</body>
<script>
  function sendEmail() {
    
  }
</script>

</html>