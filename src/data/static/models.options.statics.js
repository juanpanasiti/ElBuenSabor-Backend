module.exports = {
  unidadesMedida: () => {
    options = ["gr", "ml", "u."];
    return options;
  },
  estadoPedido: () => {
    options = [
      "Cancelado", //Cancelados por el cajero
      "Pendiente", //Recien creados por el cliente
      "Aprobado", //Aprobados por el cajero, para ser preparados por el cocinero
      "En proceso", //Tomado por el cocinero, se comenzó a cocinar
      "Preparado", //Terminado de preparar en la cocina, listo para enviar o ser retirado
      "En Delivery",//En mano del delivery
      "Entregado",//Entregado al cliente
    ];
    return options;
  },
  formasPago: () => {
    options = ["Efectivo", "Tarjeta Crédito", "Tarjeta Débito"];
    return options;
  },
  nombresRoles: () => {
    options = ["Administrador", "Cajero", "Cocinero", "Delivery"];
    return options;
  },
}; //exports
