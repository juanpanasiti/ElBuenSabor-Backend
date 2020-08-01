//urls base
const URL_BASE = "/api";
const URL_INSUMOS = URL_BASE + "/insumos";
const URL_INGREDIENTES = URL_BASE + "/ingredientes";
const URL_DOMICILIOS = URL_BASE + "/domicilios";
const URL_PLATOS = URL_BASE + "/platos";
const URL_REVENTA = URL_BASE + '/reventas';
const URL_ROLES = URL_BASE + "/roles";
const URL_RUBROS = URL_BASE + "/rubros";
const URL_USUARIOS = URL_BASE + "/usuarios";
const URL_PEDIDOS = URL_BASE + "/pedidos";
const URL_OPCIONES = URL_BASE + "/opciones";

//implementaciones de los endpoints
const insumosRoutes = require("./insumos.routes");
const reventasRoutes = require("./reventas.routes")
const ingredientesRoutes = require("./ingredientes.routes")
const domiciliosRoutes = require("./domicilios.routes")
const platosRoutes = require("./platos.routes")
const rolesRoutes = require("./roles.routes");
const rubrosRoutes = require("./rubro.routes");
const usuariosRoutes = require("./usuarios.routes");
const pedidosRoutes = require("./pedidos.routes");
const opcionesRoutes = require('./opciones.routes')


exports.assignRoutes = (app) => {
  //ENDPOINTS
  //Articulos Reventa
  app.post(URL_REVENTA + "/", reventasRoutes.createReventa); //Crear insumo
  app.get(URL_REVENTA + '/', reventasRoutes.getReventas) //Obtener todos los insumos no borrados
  app.get(URL_REVENTA + '/comprar', reventasRoutes.getReventasParaComprar) //
  app.get(URL_REVENTA + '/rubro/:rubroId') //
  app.get(URL_REVENTA + '/:id', reventasRoutes.getReventa) // Obtener insumo por ID
  app.put(URL_REVENTA + '/:id', reventasRoutes.updateReventa) // Actualizar insumo
  app.put(URL_REVENTA + '/softdelete/:id', reventasRoutes.softdeleteReventa) // Borrado lógico
  app.put(URL_REVENTA + '/softundelete/:id', reventasRoutes.softundeleteReventa) // Restaurado lógico
  app.delete(URL_REVENTA + '/harddelete/:id', reventasRoutes.hardDeleteReventa) // Borrado físico
  
  //Articulos Insumo
  app.post(URL_INSUMOS + "/", insumosRoutes.createInsumo); //Crear insumo
  app.get(URL_INSUMOS + '/', insumosRoutes.getInsumos) //Obtener todos los insumos no borrados
  app.get(URL_INSUMOS + '/comprar', insumosRoutes.getInsumosParaComprar) //
  app.get(URL_INSUMOS + '/rubro/:rubroId', insumosRoutes.getInsumosPorRubro) //
  app.get(URL_INSUMOS + '/:id', insumosRoutes.getInsumo) // Obtener insumo por ID
  app.put(URL_INSUMOS + '/:id', insumosRoutes.updateInsumo) // Actualizar insumo
  app.put(URL_INSUMOS + '/softdelete/:id', insumosRoutes.softdeleteInsumo) // Borrado lógico
  app.put(URL_INSUMOS + '/softundelete/:id', insumosRoutes.softundeleteInsumo) // Restaurado lógico
  app.delete(URL_INSUMOS + '/harddelete/:id', insumosRoutes.hardDeleteInsumo) // Borrado físico

  //Detalle Ingredientes
  //app.post(URL_INGREDIENTES + "/", ingredientesRoutes.createIngrediente); //Crear insumo
  app.get(URL_INGREDIENTES + '/', ingredientesRoutes.getIngredientes) //Obtener todos los insumos no borrados
  app.get(URL_INGREDIENTES + '/:id', ingredientesRoutes.getIngrediente) // Obtener insumo por ID
  app.put(URL_INGREDIENTES + '/:id', ingredientesRoutes.updateIngrediente) // Actualizar insumo
  app.put(URL_INGREDIENTES + '/softdelete/:id', ingredientesRoutes.softdeleteIngrediente) // Borrado lógico
  app.put(URL_INGREDIENTES + '/softundelete/:id', ingredientesRoutes.softundeleteIngrediente) // Restaurado lógico
  app.delete(URL_INGREDIENTES + '/harddelete/:id', ingredientesRoutes.hardDeleteIngrediente) // Borrado físico
  
  //Domicilios
  app.post(URL_DOMICILIOS + "/", domiciliosRoutes.createDomicilio); //Crear insumo
  app.get(URL_DOMICILIOS + '/', domiciliosRoutes.getDomicilios) //Obtener todos los insumos no borrados
  app.get(URL_DOMICILIOS + '/:id', domiciliosRoutes.getDomicilio) // Obtener insumo por ID
  app.put(URL_DOMICILIOS + '/:id', domiciliosRoutes.updateDomicilio) // Actualizar insumo
  app.put(URL_DOMICILIOS + '/softdelete/:id', domiciliosRoutes.softdeleteDomicilio) // Borrado lógico
  app.put(URL_DOMICILIOS + '/softundelete/:id', domiciliosRoutes.softundeleteDomicilio) // Restaurado lógico
  app.delete(URL_DOMICILIOS + '/harddelete/:id', domiciliosRoutes.hardDeleteDomicilio) // Borrado físico
  
  //Platos
  app.post(URL_PLATOS + "/", platosRoutes.createPlato); //Crear plato
  app.get(URL_PLATOS + '/', platosRoutes.getPlatos) //Obtener todos los platos no borrados
  app.get(URL_PLATOS + '/:id', platosRoutes.getPlato) // Obtener platos por ID
  app.get(URL_PLATOS + '/rubro/:rubroId', platosRoutes.getPlatosPorRubro) //
  app.put(URL_PLATOS + '/:id/agregar-ingredientes', platosRoutes.addIngredientes)
  app.put(URL_PLATOS + '/:id', platosRoutes.updatePlato) // Actualizar plato
  app.put(URL_PLATOS + '/softdelete/:id', platosRoutes.softdeletePlato) // Borrado lógico
  app.put(URL_PLATOS + '/softundelete/:id', platosRoutes.softundeletePlato) // Restaurado lógico
  app.delete(URL_PLATOS + '/harddelete/:id', platosRoutes.hardDeletePlato) // Borrado físico

  //Roles
  app.post(URL_ROLES + "/", rolesRoutes.createRol); // Crear rol
  app.get(URL_ROLES + "/", rolesRoutes.getRoles); //Roles no borrados
  app.get(URL_ROLES + "/:id", rolesRoutes.getRolById); // Obtener rol por ID de Rol
  app.put(URL_ROLES + "/:id", rolesRoutes.updateRol); // Actualizar rol
  app.put(URL_ROLES + "/softdelete/:id", rolesRoutes.softdeleteRol); // Borrado lógico
  app.put(URL_ROLES + "/softundelete/:id", rolesRoutes.softundeleteRol); // Restaurado lógico
  app.delete(URL_ROLES + "/harddelete/:id", rolesRoutes.hardDeleteRol); // Borrado físico

  //Rubros
  app.post(URL_RUBROS + "/", rubrosRoutes.createRubro); //Crear un rubro
  app.get(URL_RUBROS + "/", rubrosRoutes.getRubros); //Obtener rubros no borrados
  app.get(URL_RUBROS + "/raices", rubrosRoutes.getRubrosRaiz); //Obtener rubros raíz (no borrados)
  app.get(URL_RUBROS + "/:id/subrubros", rubrosRoutes.getRubrosHijos); //Obtener subrubros (no borrados)
  app.get(URL_RUBROS + "/borrados", rubrosRoutes.getRubrosBorrados); //Obtener rubros borrados
  app.get(URL_RUBROS + "/deInsumo", rubrosRoutes.getRubrosInsumo); //obtener rubros de insumos
  app.get(URL_RUBROS + "/deCatalogo", rubrosRoutes.getRubrosCatalogo); //obtener rubros de catalogo
  app.get(URL_RUBROS + "/:id", rubrosRoutes.getRubro); //obtener un rubro
  app.put(URL_RUBROS + "/:id", rubrosRoutes.updateRubro); //actualizar un rubro
  app.put(URL_RUBROS + "/softdelete/:id", rubrosRoutes.softDeleteRubro); //borrado lógico de un rubro
  app.put(URL_RUBROS + "/softundelete/:id", rubrosRoutes.softUndeleteRubro); //restaurado lógico de un rubro
  app.delete(URL_RUBROS + "/harddelete/:id", rubrosRoutes.hardDeleteRubro); //borrado fisico de un rubro

  //Usuarios
  //app.post(URL_USUARIOS + '/'); //Crear usuario
  app.get(URL_USUARIOS + "/", usuariosRoutes.getUsuarios); //Obtener todos los usuarios (borrados o no)
  app.get(URL_USUARIOS + "/check/:email", usuariosRoutes.getUsuarioByEmail); //Obtener usuario por email
  app.get(URL_USUARIOS + "/:id", usuariosRoutes.getUsuarioById); //Obtener usuario por ID
  app.put(URL_USUARIOS + "/:id", usuariosRoutes.updateUsuario); //Actualizar usuario
  app.put(URL_USUARIOS + "/softdelete/:id", usuariosRoutes.softdeleteUsuario); //Borrado lógido de un usuario
  app.put(URL_USUARIOS + "/softundelete/:id", usuariosRoutes.softundeleteUsuario); //Restaurado lógido de un usuario
  app.delete(URL_USUARIOS + "/harddelete/:id", usuariosRoutes.hardDeleteUsuario); //Borrado físico de un usuario
  app.get(URL_USUARIOS + '/roles/:email', usuariosRoutes.getRolesByEmail)// Obtener lista de roles asociados a un email
  app.get(URL_USUARIOS + '/rol/:rol', usuariosRoutes.getUsuariosByRol)// Obtener lista de usuarios asociados a un rol

  //Pedidos
  app.post(URL_PEDIDOS + '/', pedidosRoutes.createPedido)
  app.get(URL_PEDIDOS + '/:id', pedidosRoutes.getPedido)
  //Obtener por estados
  app.get(URL_PEDIDOS + '/estado/cancelados', pedidosRoutes.getPedidosByEstado)
  app.get(URL_PEDIDOS + '/estado/pendientes', pedidosRoutes.getPedidosByEstado)
  app.get(URL_PEDIDOS + '/estado/aprobados', pedidosRoutes.getPedidosByEstado)
  app.get(URL_PEDIDOS + '/estado/en-proceso', pedidosRoutes.getPedidosByEstado)
  app.get(URL_PEDIDOS + '/estado/preparados', pedidosRoutes.getPedidosByEstado)
  app.get(URL_PEDIDOS + '/estado/en-delivery', pedidosRoutes.getPedidosByEstado)
  app.get(URL_PEDIDOS + '/estado/entregados', pedidosRoutes.getPedidosByEstado)
  //Actualizar estado del pedido
  app.put(URL_PEDIDOS + '/cancelar/:id', pedidosRoutes.updateEstadoPedido)
  app.put(URL_PEDIDOS + '/aprobar/:id', pedidosRoutes.updateEstadoPedido)
  app.put(URL_PEDIDOS + '/comenzar/:id', pedidosRoutes.updateEstadoPedido)
  app.put(URL_PEDIDOS + '/terminar/:id', pedidosRoutes.updateEstadoPedido)
  app.put(URL_PEDIDOS + '/enviar/:id', pedidosRoutes.updateEstadoPedido)
  app.put(URL_PEDIDOS + '/entregar/:id', pedidosRoutes.updateEstadoPedido)
  //
  app.get(URL_PEDIDOS + '/:id/facturar', pedidosRoutes.facturarPedido)
  app.put(URL_PEDIDOS + '/agregar-item')
  //Otras consultas
  app.put(URL_PEDIDOS + '/:email')



  //Opciones para selects de los formularios
  app.get(URL_OPCIONES + '/unidades-medida', opcionesRoutes.getUnidadesMedida)
  app.get(URL_OPCIONES + '/estados-pedido', opcionesRoutes.getEstadoPedido)
  app.get(URL_OPCIONES + '/formas-pago', opcionesRoutes.getFormasPago)
  app.get(URL_OPCIONES + '/nombres-rol', opcionesRoutes.getNombresRoles)
}; //exports.assignRoutes
