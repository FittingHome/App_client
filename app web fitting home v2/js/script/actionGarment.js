function putGarment(id, type) {
    const url = "http://api.fittinghome.fr/garment/simulateGarmentsOnUser";
    const userId = localStorage.getItem("userId");
    var topGarmentId = localStorage.getItem("topGarmentName");
    var downGarmentId = localStorage.getItem("downGarmentName");
    const garmentsId = [];

    if (type == 'top') {
      localStorage.setItem("topGarmentName", id);
      topGarmentId = id;
    }
    if (type == 'down') {
      localStorage.setItem("downGarmentName", id);
      downGarmentId = id;
    }
    if (topGarmentId != undefined && topGarmentId != '') {
      garmentsId.push(topGarmentId);
    }

    if (downGarmentId != undefined && downGarmentId != '') {
      garmentsId.push(downGarmentId);
    }
    
    console.log("userId: ", userId);
    console.log("garmentsId: ", garmentsId);

    // const xhttp = new XMLHttpRequest();
    // xhttp.open("POST", url);
    // xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // xhttp.send(JSON.stringify({
    //   "userId": userId,
    //   "garmentsId": garmentsId
    // }));
    // xhttp.onreadystatechange = function () {
    //   if (this.readyState == 4) {
    //     const objects = JSON.parse(this.responseText);
    //     console.log("id: ", objects['id']);
    //     window.location.href = '../../index.php?id=' + objects['id'];
    //   }
    // };
    // return false;
}

function getAllGarments() {
  const json = '[{"id": "Tshirt","name": "T-shirt","pathImg": "resources/images/Tshirt.png","price": "$19.99","size": ["S"],"type": "top"},{"id": "Pants","name": "Pant","pathImg": "resources/images/Pants.png","price": "$19.99","size": ["S", "M", "L"],"type": "down"},{"id": "hoodie","name": "Hoody","pathImg": "resources/images/Male_Hoody.png","price": "$19.99","size": ["S", "M", "L"],"type": "top"},{"id": "Garments1_Hana","name": "Crop Top","pathImg": "resources/images/Garments1_Hana.png","price": "$19.99","size": ["S"],"type": "top"},{"id": "Female_HalterneckDress","name": "Dress","pathImg": "resources/images/Female_HalterneckDress.png","price": "$19.99","size": ["S"],"type": "top"}]';
  const obj = JSON.parse(json);
  return obj;
  // fetch("http://api.fittinghome.fr/garmentcollection/getAll")
  //   .then((response) => {
  //     if (response.ok) {
  //       return response.json();
  //     } else {
  //       throw new Error("NETWORK RESPONSE ERROR");
  //     }
  //   })
  //   .then((data) => {
  //     console.log("garments :", data);
  //     localStorage.setItem("garmentsCollection", data);
  //     return data;
  //   })
  //   .catch((error) => console.error("FETCH ERROR:", error));
}

function getFavoriteGarments() {
  const json = '[{"id": "Tshirt","name": "T-shirt","pathImg": "resources/images/Tshirt.png","price": "$19.99","size": ["S"],"type": "top"},{"id": "Pants","name": "Pant","pathImg": "resources/images/Pants.png","price": "$19.99","size": ["S", "M", "L"],"type": "down"},{"id": "hoodie","name": "Hoody","pathImg": "resources/images/Male_Hoody.png","price": "$19.99","size": ["S", "M", "L"],"type": "top"},{"id": "Garments1_Hana","name": "Crop Top","pathImg": "resources/images/Garments1_Hana.png","price": "$19.99","size": ["S"],"type": "top"},{"id": "Female_HalterneckDress","name": "Dress","pathImg": "resources/images/Female_HalterneckDress.png","price": "$19.99","size": ["S"],"type": "top"}]';
  const obj = JSON.parse(json);
  return obj;
  // fetch("http://api.fittinghome.fr/garmentcollection/getAll")
  //   .then((response) => {
  //     if (response.ok) {
  //       return response.json();
  //     } else {
  //       throw new Error("NETWORK RESPONSE ERROR");
  //     }
  //   })
  //   .then((data) => {
  //     console.log("garments :", data);
  //     localStorage.setItem("garmentsCollection", data);
  //     return data;
  //   })
  //   .catch((error) => console.error("FETCH ERROR:", error));
}

function searchGarments(name) {
  const json = '[{"id": "Tshirt","name": "T-shirt","pathImg": "resources/images/Pants.png","price": "$19.99","size": ["S"],"type": "top"}]';
  const obj = JSON.parse(json);
  return obj;
  // fetch("http://api.fittinghome.fr/garmentcollection/searchByName?name=" + name)
  //   .then((response) => {
  //     if (response.ok) {
  //       return response.json();
  //     } else {
  //       throw new Error("NETWORK RESPONSE ERROR");
  //     }
  //   })
  //   .then((data) => {
  //     console.log("garments :", data);
  //     localStorage.setItem("garmentsCollection", data);
  //   })
  //   .catch((error) => console.error("FETCH ERROR:", error));
}