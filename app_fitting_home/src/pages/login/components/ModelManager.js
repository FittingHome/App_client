export default function findClosestModel(modelsData, age, size, weight) {
  var tab = [];
  console.log("models datas", modelsData);

  for (var i = 0; modelsData.length > i; i++) {
    if (
      age <= modelsData[i].morphology.age + 20 &&
      age >= modelsData[i].morphology.age - 20
    ) {
      if (
        size <= modelsData[i].morphology.height + 20 &&
        size >= modelsData[i].morphology.height - 20
      ) {
        if (
          weight <= modelsData[i].morphology.weight + 20 &&
          weight >= modelsData[i].morphology.weight - 20
        ) {
          console.log("line", modelsData[i]);
          var model = {
            filename: modelsData[i].filename,
            _id: modelsData[i]._id,
          };
          tab.push(model);
        }
      }
    }
  }
  console.log(tab);
  return tab;
}
