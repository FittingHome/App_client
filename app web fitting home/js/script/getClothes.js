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
      
        n = (content.length)
        console.log(content);
        // for(i = 0; i <= (n-1); i++){
            document.getElementById("name").innerHTML = "<li>"+content[0].name +"</li>"
            document.getElementById("date").innerHTML = "<li>"+content[0].createdAt +"</li>"
            document.getElementById("name1").innerHTML = "<li>"+content[1].name +"</li>"
            document.getElementById("date1").innerHTML = "<li>"+content[1].createdAt +"</li>"
            document.getElementById("name2").innerHTML = "<li>"+content[2].name +"</li>"
            document.getElementById("date2").innerHTML = "<li>"+content[2].createdAt +"</li>"
        // }
      })();