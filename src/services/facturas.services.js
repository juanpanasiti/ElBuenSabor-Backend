const pdf = require("html-pdf");
const { logError, logSuccess, logWarning } = require("../config/logger.config");
const { getFacturaHTML, getSimpleFacturaHTML } = require("../data/static/modelo.factura");
const carpetaFacturas = "public/facturas";

exports.crearFactura = (pedido) => {
  logWarning(pedido);
  const content = getSimpleFacturaHTML(pedido);
  const options = {
    format: "A5",
    footer: {
      height: "10mm",
    },
    border: {
      top: "5mm", 
      right: "5mm",
      bottom: "5mm",
      left: "5mm",
    },
  };
  return new Promise((resolve, reject) => {
    pdf
      .create(content, options)
      .toFile(`${carpetaFacturas}/${pedido._id}.pdf`, function (err, res) {
        if (err) {
          logError(err);
          reject(err);
        } else {
          logSuccess(res);
          resolve(res);
        }
      });
  });
}; //exports.crearFactura
