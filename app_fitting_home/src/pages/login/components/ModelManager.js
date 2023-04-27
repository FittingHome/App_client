export default function findClosestModel(modelsData, age, size, weight) {
  var tab = [];
  console.log("models datas", modelsData);

  for (var i = 0; modelsData.length > i; i++) {
    if (
      age <= modelsData[i].morphology.age + 15 &&
      age >= modelsData[i].morphology.age - 15
    ) {
      if (
        size <= modelsData[i].morphology.height + 15 &&
        size >= modelsData[i].morphology.height - 15
      ) {
        if (
          weight <= modelsData[i].morphology.weight + 15 &&
          weight >= modelsData[i].morphology.weight - 15
        ) {
          console.log("line", modelsData[i]);
          var model = {
            filename: modelsData[i].filename,
            _id: modelsData[i]._id,
            name: modelsData[i].name,
          };
          tab.push(model);
        }
      }
    }
  }
  console.log(tab);
  return tab;
}
