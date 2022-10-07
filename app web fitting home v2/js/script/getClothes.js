// api url


// Defining async function

    (async () => {
        const rawResponse = await fetch('http://api.fittinghome.fr/cloth/getAll', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({a: 1, b: 'Textual content'})
        });
        const content = await rawResponse.json();
        var clothes_name = "";

        n = (content.length)
        console.log(content);
        for(i = 0; i <= (n-1); i++){
          clothes_name += "<div class='card'><h1>"+content[i].name +"</h1>" + "<p>"+content[i].createdAt +"</p>" + "<p><button href='index.html'>Essayer sur votre model</button></p></div>";
            // document.getElementById("name").innerHTML = "<p>"+content[i].name +"</p>"
            // document.getElementById("date").innerHTML = "<p>"+content[i].createdAt +"</p>"
        }
        document.querySelector("clothe").innerHTML = clothes_name
      })();

