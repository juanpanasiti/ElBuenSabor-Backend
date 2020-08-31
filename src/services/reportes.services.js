//Requires
const insumosDB = require("../data/db/insumos.db");
const reventasDB = require("../data/db/reventas.db");
const pedidosDB = require("../data/db/pedidos.db");
const carpetaReportes = "public/";
const xl = require("excel4node");
const { logError, logWarning, logInfo } = require("../config/logger.config");
const { estadoPedido } = require("../data/static/models.options.statics");

//////////////////////////////////////////////////////

//Repores para MOSTRAR
exports.getArticulosParaComprar = async () => {
  try {
    const insumosPC = await insumosDB.getInsumosParaComprar();
    const reventasPC = await reventasDB.getReventasParaComprar();
    const articulos = [];
    for (const insumo of insumosPC) {
      articulos.push({
        denominacion: insumo.denominacion,
        tipo: "Insumo",
        stockActual: insumo.stockActual,
        stockMinimo: insumo.stockMinimo,
        stockMaximo: insumo.stockMaximo,
        compraMax: insumo.stockMaximo - insumo.stockActual,
      });
    } //for-of insumosPC
    for (const reventa of reventasPC) {
      articulos.push({
        denominacion: reventa.denominacion,
        tipo: "Insumo",
        stockActual: reventa.stockActual,
        stockMinimo: reventa.stockMinimo,
        stockMaximo: reventa.stockMaximo,
        compraMax: reventa.stockMaximo - reventa.stockActual,
      });
    } //for-of reventasPC
    return Promise.resolve(articulos);
  } catch (error) {
    logError(`Error -> reportes.services -> getArticulosParaComprar -> ${error}`);
    return Promise.reject(error);
  }
}; //getArticulosParaComprar

exports.getRecaudaciones = (desde, hasta) => {
  if (desde > hasta) {
    logError("La fecha desde no puede ser posterior a la fecha hasta");
    return Promise.reject({
      error: "La fecha desde no puede ser posterior a la fecha hasta",
    });
  } else {
    return new Promise((resolve, reject) => {
      const condicion = {
        fecha: { $gte: desde, $lte: hasta },
        estado: estadoPedido()[6].toLowerCase(), //entregado y por ende, facturado
      };
      pedidosDB
        .getPedidosPorCondicion(condicion)
        .then((pedidos) => {
          const reporte = [];
          for (const pedido of pedidos) {
            let encontrado = false;
            for (const item of reporte) {
              if (item.fecha.toString().slice(0,10) === pedido.fecha.toString().slice(0,10)) {
                encontrado = true;
                (item.subtotal += pedido.detalle.subtotal),
                  (item.descuento += pedido.detalle.subtotal - pedido.total),
                  (item.total += pedido.total);
                break;
              } //if
            } //for-of-item-reporte
            if (!encontrado) {
              reporte.push({
                fecha: pedido.fecha,
                subtotal: pedido.detalle.subtotal,
                descuento: pedido.detalle.subtotal - pedido.total,
                total: pedido.total,
              });
            }
          }
          resolve(reporte);
        })
        .catch((error) => {
          logError(`Error -> reportes.services -> getRecaudaciones -> ${error}`);
          return Promise.reject(error);
        });
    });
  }
}; //getRecaudaciones

exports.getRankingPlatos = (desde, hasta) => {
  if (desde > hasta) {
    logError("La fecha desde no puede ser posterior a la fecha hasta");
    return Promise.reject({
      error: "La fecha desde no puede ser posterior a la fecha hasta",
    });
  } else {
    return new Promise((resolve, reject) => {
      const condicion = {
        fecha: { $gte: desde, $lte: hasta },
      };
      pedidosDB
        .getPedidosPorCondicion(condicion)
        .then((pedidos) => {
          const reporte = [];
          for (const pedido of pedidos) {
            for (const plato of pedido.detalle.platos) {
              let encontrado = false;
              for (const item of reporte) {
                if (item.platoId === plato.item_id._id) {
                  encontrado = true;
                  item.cantidad += plato.cantidad;
                }
              } //for-of reporte
              if (!encontrado) {
                reporte.push({
                  plato: plato.item_id.denominacion,
                  platoId: plato.item_id._id,
                  cantidad: plato.cantidad,
                });
              }
            } //for-of platos
          } //for-of pedidos
          reporte.sort((a, b) => {
            if (a.cantidad > b.cantidad) {
              return -1;
            }
            if (a.cantidad < b.cantidad) {
              return 1;
            }
            return 0;
          });
          resolve(reporte);
        })
        .catch((error) => {
          logError(`Error -> reportes.services -> getRecaudaciones -> ${error}`);
          return Promise.reject(error);
        });
    }); //new Promise
  } //if-else
}; //getRankingPlatos

exports.getPedidosPorCliente = async (desde, hasta) => {
  if (desde > hasta) {
    logError("La fecha desde no puede ser posterior a la fecha hasta");
    return Promise.reject({
      error: "La fecha desde no puede ser posterior a la fecha hasta",
    });
  } else {
    return new Promise((resolve, reject) => {
      const edoEntregado = estadoPedido()[6].toLowerCase();
      const condicion = {
        fecha: { $gte: desde, $lte: hasta },
      };
      pedidosDB
        .getPedidosPorCondicion(condicion)
        .then((pedidos) => {
          const reporte = [];
          for (const pedido of pedidos) {
            let encontrado = false;
            for (const item of reporte) {
              logInfo(pedido);
              if (item.usuarioId === pedido.usuario._id) {
                logWarning("Repetido!!");
                encontrado = true;
                item.pedidosRealizados += 1;
                if (pedido.estado === edoEntregado) {
                  item.pedidosEntregados += 1;
                  item.totalFacturado += pedido.total;
                }
              }
            } //for-of reporte
            if (!encontrado) {
              reporte.push({
                usuarioId: pedido.usuario._id,
                nombre: `${pedido.usuario.apellido}, ${pedido.usuario.nombre}`,
                email: pedido.usuario.email,
                pedidosRealizados: 1,
                pedidosEntregados: pedido.estado === edoEntregado ? 1 : 0,
                totalFacturado: pedido.estado === edoEntregado ? pedido.total : 0,
              });
            }
          } //for-of pedidos

          resolve(reporte);
        })
        .catch((error) => {
          logError(`Error -> reportes.services -> getPedidosPorCliente -> ${error}`);
          return Promise.reject(error);
        });
    }); //new Promise
  } //if-else
};

//Reportes para DESCARGAR
exports.getExcelArticulosParaComprar = async () => {
  const libro = new xl.Workbook();
  const hoja = libro.addWorksheet("Reporte Stock");
  let fila = 1;
  let col = 1;
  const articulosPC = await this.getArticulosParaComprar();

  //Estilos para docs de excel
  const estiloTitulo = libro.createStyle({
    font: {
      color: "#FF0800",
      size: 14,
    },
  });
  const estiloCabecera = libro.createStyle({
    font: {
      color: "#0008FF",
      size: 12,
    },
  });
  const estiloTexto = libro.createStyle({
    font: {
      color: "#000000",
      size: 10,
    },
  });
  const estiloMoneda = libro.createStyle({
    numberFormat: "$#,##0.00; ($#,##0.00); -",
  });
  const estiloFecha = libro.createStyle({
    dateFormat: "d/m/yy hh:mm:ss",
  });

  //Armar libro
  hoja.cell(fila, col).string("Artículos con nivel de stock crítico").style(estiloTitulo);
  fila++;
  //Cabecera tabla
  hoja.cell(fila, col).string("Artículo").style(estiloCabecera);
  col++;
  hoja.cell(fila, col).string("Tipo").style(estiloCabecera);
  col++;
  hoja.cell(fila, col).string("Stock Actual").style(estiloCabecera);
  col++;
  hoja.cell(fila, col).string("Stock Minimo").style(estiloCabecera);
  col++;
  hoja.cell(fila, col).string("Stock Máximo").style(estiloCabecera);
  col++;
  hoja.cell(fila, col).string("Máx. a comprar").style(estiloCabecera);
  col = 1;
  fila++;
  for (const articulo of articulosPC) {
    hoja.cell(fila, col).string(articulo.denominacion).style(estiloTexto);
    col++;
    hoja.cell(fila, col).string(articulo.tipo).style(estiloTexto);
    col++;
    hoja.cell(fila, col).number(articulo.stockActual).style(estiloTexto);
    col++;
    hoja.cell(fila, col).number(articulo.stockMinimo).style(estiloTexto);
    col++;
    hoja.cell(fila, col).number(articulo.stockMaximo).style(estiloTexto);
    col++;
    hoja.cell(fila, col).number(articulo.compraMax).style(estiloTexto);
    col = 1;
    fila++;
  } //for-of insumosPC

  //Generar excel
  return new Promise((resolve, reject) => {
    try {
      libro.write(carpetaReportes + "reporteStock.xlsx", (err, stats) => {
        if (err) {
          logError(err);
          reject(err);
        } else {
          resolve(carpetaReportes + "reporteStock.xlsx");
        }
      });
    } catch (error) {
      reject("ERROR try-catch");
    }
  });
}; //getExcelArticulosParaComprar

exports.getExcelRecaudaciones = async (desde, hasta) => {
  const libro = new xl.Workbook();
  const hoja = libro.addWorksheet("Reporte Recaudaciones");
  let fila = 1;
  let tSubtotal = 0;
  let tDescuento = 0;
  let tTotal = 0;
  const pedidos = await this.getRecaudaciones(desde, hasta);

  //Estilos para docs de excel
  const estiloTitulo = libro.createStyle({
    font: {
      color: "#FF0800",
      size: 14,
    },
  });
  const estiloCabecera = libro.createStyle({
    font: {
      color: "#0008FF",
      size: 12,
    },
  });
  const estiloTexto = libro.createStyle({
    font: {
      color: "#000000",
      size: 10,
    },
  });
  const estiloMoneda = libro.createStyle({
    numberFormat: "$#,##0.00; ($#,##0.00); -",
  });
  const estiloFecha = libro.createStyle({
    dateFormat: "d/m/yy hh:mm:ss",
  });

  //Armar libro
  hoja.cell(fila, 1).string("Recaudaciones percibidas").style(estiloTitulo);
  fila++;
  hoja.cell(fila, 1).string("Desde:").style(estiloCabecera);
  hoja.cell(fila, 2).date(desde).style(estiloFecha);
  fila++;
  hoja.cell(fila, 1).string("Hasta:").style(estiloCabecera);
  hoja.cell(fila, 2).date(hasta).style(estiloFecha);
  fila++;

  //Cabecera tabla
  hoja.cell(fila, 1).string("Fecha").style(estiloCabecera);
  hoja.cell(fila, 2).string("Subtotal").style(estiloCabecera);
  hoja.cell(fila, 3).string("Descuento").style(estiloCabecera);
  hoja.cell(fila, 4).string("Total").style(estiloCabecera);
  fila++;
  for (const pedido of pedidos) {
    hoja.cell(fila, 1).date(pedido.fecha).style(estiloTexto).style(estiloFecha);
    hoja.cell(fila, 2).number(pedido.subtotal).style(estiloTexto).style(estiloMoneda);
    tSubtotal += pedido.subtotal;
    hoja.cell(fila, 3).number(pedido.descuento).style(estiloTexto).style(estiloMoneda);
    tDescuento += pedido.descuento;
    hoja.cell(fila, 4).number(pedido.total).style(estiloTexto).style(estiloMoneda);
    tTotal += pedido.total;
    fila++;
  } //for-of pedidos

  hoja.cell(fila, 1).string("TOTALES:").style(estiloCabecera);
  hoja.cell(fila, 2).number(tSubtotal).style(estiloTexto).style(estiloMoneda);
  hoja.cell(fila, 3).number(tDescuento).style(estiloTexto).style(estiloMoneda);
  hoja.cell(fila, 4).number(tTotal).style(estiloTexto).style(estiloMoneda);

  //Generar excel
  return new Promise((resolve, reject) => {
    try {
      libro.write(carpetaReportes + "reporteRecaudaciones.xlsx", (err, stats) => {
        if (err) {
          logError(err);
          reject(err);
        } else {
          resolve(carpetaReportes + "reporteRecaudaciones.xlsx");
        }
      });
    } catch (error) {
      reject("ERROR try-catch");
    }
  });
}; //getExcelRecaudaciones

exports.getExcelRankingPlatos = async (desde, hasta) => {
  const libro = new xl.Workbook();
  const hoja = libro.addWorksheet("Reporte Ranking Platos");
  let fila = 1;
  const pedidos = await this.getRankingPlatos(desde, hasta);

  //Estilos para docs de excel
  const estiloTitulo = libro.createStyle({
    font: {
      color: "#FF0800",
      size: 14,
    },
  });
  const estiloCabecera = libro.createStyle({
    font: {
      color: "#0008FF",
      size: 12,
    },
  });
  const estiloTexto = libro.createStyle({
    font: {
      color: "#000000",
      size: 10,
    },
  });

  const estiloFecha = libro.createStyle({
    dateFormat: "d/m/yy hh:mm:ss",
  });

  //Armar libro
  hoja.cell(fila, 1).string("Ranking de platos más pedidos").style(estiloTitulo);
  fila++;
  hoja.cell(fila, 1).string("Desde:").style(estiloCabecera);
  hoja.cell(fila, 2).date(desde).style(estiloFecha);
  fila++;
  hoja.cell(fila, 1).string("Hasta:").style(estiloCabecera);
  hoja.cell(fila, 2).date(hasta).style(estiloFecha);
  fila++;

  //Cabecera tabla
  hoja.cell(fila, 1).string("Plato").style(estiloCabecera);
  hoja.cell(fila, 2).string("Cant.").style(estiloCabecera);
  fila++;
  for (const pedido of pedidos) {
    hoja.cell(fila, 1).string(pedido.plato).style(estiloTexto);
    hoja.cell(fila, 2).number(pedido.cantidad).style(estiloTexto);
    fila++;
  } //for-of pedidos

  //Generar excel
  return new Promise((resolve, reject) => {
    try {
      libro.write(carpetaReportes + "reporteRanking.xlsx", (err, stats) => {
        if (err) {
          logError(err);
          reject(err);
        } else {
          resolve(carpetaReportes + "reporteRanking.xlsx");
        }
      });
    } catch (error) {
      reject("ERROR try-catch");
    }
  });
}; //getExcelRankingPlatos

exports.getExcelPedidosPorCliente = async (desde, hasta) => {
  const libro = new xl.Workbook();
  const hoja = libro.addWorksheet("Reporte Ranking Platos");
  let fila = 1;
  const pedidos = await this.getPedidosPorCliente(desde, hasta);

  //Estilos para docs de excel
  const estiloTitulo = libro.createStyle({
    font: {
      color: "#FF0800",
      size: 14,
    },
  });
  const estiloCabecera = libro.createStyle({
    font: {
      color: "#0008FF",
      size: 12,
    },
  });
  const estiloTexto = libro.createStyle({
    font: {
      color: "#000000",
      size: 10,
    },
  });

  const estiloFecha = libro.createStyle({
    dateFormat: "d/m/yy hh:mm:ss",
  });

  const estiloMoneda = libro.createStyle({
    numberFormat: "$#,##0.00; ($#,##0.00); -",
  });

  //Armar libro
  hoja.cell(fila, 1).string("Pedidos realizados por Cliente").style(estiloTitulo);
  fila++;
  hoja.cell(fila, 1).string("Desde:").style(estiloCabecera);
  hoja.cell(fila, 2).date(desde).style(estiloFecha);
  fila++;
  hoja.cell(fila, 1).string("Hasta:").style(estiloCabecera);
  hoja.cell(fila, 2).date(hasta).style(estiloFecha);
  fila++;

  //Cabecera tabla
  hoja.cell(fila, 1).string("Cliente").style(estiloCabecera);
  hoja.cell(fila, 2).string("Email").style(estiloCabecera);
  hoja.cell(fila, 3).string("P. Realizados").style(estiloCabecera);
  hoja.cell(fila, 4).string("P. Entregados").style(estiloCabecera);
  hoja.cell(fila, 5).string("Total Facturado").style(estiloCabecera);
  fila++;
  for (const pedido of pedidos) {
    hoja.cell(fila, 1).string(pedido.nombre).style(estiloTexto);
    hoja.cell(fila, 2).string(pedido.email).style(estiloTexto);
    hoja.cell(fila, 3).number(pedido.pedidosRealizados).style(estiloTexto);
    hoja.cell(fila, 4).number(pedido.pedidosEntregados).style(estiloTexto);
    hoja
      .cell(fila, 5)
      .number(pedido.totalFacturado)
      .style(estiloTexto)
      .style(estiloMoneda);
    fila++;
  } //for-of pedidos

  //Generar excel
  return new Promise((resolve, reject) => {
    try {
      libro.write(carpetaReportes + "reportePedidosCliente.xlsx", (err, stats) => {
        if (err) {
          logError(err);
          reject(err);
        } else {
          resolve(carpetaReportes + "reportePedidosCliente.xlsx");
        }
      });
    } catch (error) {
      reject("ERROR try-catch");
    }
  });
}; //getExcelPedidosPorCliente
