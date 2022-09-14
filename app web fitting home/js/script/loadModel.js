const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let modelName = "woman"; // remplacer par default
if (urlParams.get('modelName') != null) {
    modelName = urlParams.get('modelName');
    localStorage.setItem('modelName', modelName);
} else {
    modelName = localStorage.getItem('modelName');
}

let topGarmentName;
if (urlParams.get('topGarmentName') != null) {
    topGarmentName = urlParams.get('topGarmentName');
    localStorage.setItem('topGarmentName', topGarmentName);
} else {
    topGarmentName = localStorage.getItem('topGarmentName');
    console.log(topGarmentName);
}

let downGarmentName;
if (urlParams.get('downGarmentName') != null) {
    downGarmentName = urlParams.get('downGarmentName');
    localStorage.setItem('downGarmentName', downGarmentName);
} else {
    downGarmentName = localStorage.getItem('downGarmentName');
}