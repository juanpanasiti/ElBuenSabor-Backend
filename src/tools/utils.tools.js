//Devuleve un array que no incluye el elemento seleccionado, sirve como remove
exports.removeItemFromList = (array, elemento) => {
  let newArray = [];
  for (let el of array) {
    const id = el._id ? el._id : el;
    if (id != elemento.toString()) {
      newArray.push(el);
    }
  }
  console.log("removido");

  return newArray;
};
