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

exports.logError = (msg) => {
  console.log("\x1b[1m\x1b[5m\x1b[41m\x1b[37m%s\x1b[0m", "ERROR:");
  console.log("\x1b[31m%s\x1b[0m", msg);
}; //logError

exports.logInfo = (msg) => {
  console.log("\x1b[1m\x1b[5m\x1b[46m\x1b[30m%s\x1b[0m", "INFO:");
  console.log("\x1b[36m%s\x1b[0m", msg);
}; //logInfo

exports.logSuccess = (msg) => {
  console.log("\x1b[1m\x1b[5m\x1b[42m\x1b[30m%s\x1b[0m", "SUCCESS:");
  console.log("\x1b[32m%s\x1b[0m", msg);
}; //logSuccess

exports.logWarning = (msg) => {
  console.log("\x1b[1m\x1b[5m\x1b[43m\x1b[30m%s\x1b[0m", "WARNING:");
  console.log("\x1b[33m%s\x1b[0m", msg);
}; //logWarning
