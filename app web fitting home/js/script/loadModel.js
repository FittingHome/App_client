const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let modelName = "woman"; // remplacer par default
if (urlParams.get('modelName') != null) {
    modelName = urlParams.get('modelName');
}
let topGarmentName;
if (urlParams.get('topGarmentName') != null) {
    topGarmentName = urlParams.get('topGarmentName');
}
let downGarmentName;
if (urlParams.get('downGarmentName') != null) {
    downGarmentName = urlParams.get('downGarmentName');
}