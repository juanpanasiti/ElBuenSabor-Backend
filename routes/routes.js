//urls base
const URL_BASE = "/api";
const URL_INSUMOS = URL_BASE + "/insumos";
const URL_REVENTA = URL_BASE + '/reventa';
const URL_ROLES = URL_BASE + "/roles";
const URL_RUBROS = URL_BASE + "/rubros";
const URL_USUARIOS = URL_BASE + "/usuarios";

//implementaciones de los endpoints
const insumosRoutes = require("./insumos.routes");
const reventasRoutes = require("./reventas.routes")
//const ingredientesRoutes = require("./ingredientes.routes")
//const domiciliosRoutes = require("./domicilios.routes")
//const platosRoutes = require("./platos.routes")
const rolesRoutes = require("./roles.routes");
const rubrosRoutes = require("./rubro.routes");
const usuariosRoutes = require("./usuarios.routes");


exports.assignRoutes = (app) => {
  //ENDPOINTS
  //Articulos Insumo
  app.post(URL_REVENTA + "/", reventasRoutes.createReventa); //Crear insumo
  app.get(URL_REVENTA + '/', reventasRoutes.getReventa) //Obtener todos los insumos no borrados
  app.get(URL_REVENTA + '/:id', reventasRoutes.getReventa) // Obtener insumo por ID
  app.put(URL_REVENTA + '/:id', reventasRoutes.updateReventa) // Actualizar insumo
  app.put(URL_REVENTA + '/softdelete/:id', reventasRoutes.softdeleteReventa) // Borrado lógico
  app.put(URL_REVENTA + '/softundelete/:id', reventasRoutes.softundeleteReventa) // Restaurado lógico
  app.delete(URL_REVENTA + '/harddelete/:id', reventasRoutes.hardDeleteReventa) // Borrado físico

  //Articulos Reventa
  app.post(URL_INSUMOS + "/", insumosRoutes.createInsumo); //Crear insumo
  app.get(URL_INSUMOS + '/', insumosRoutes.getInsumos) //Obtener todos los insumos no borrados
  app.get(URL_INSUMOS + '/:id', insumosRoutes.getInsumo) // Obtener insumo por ID
  app.put(URL_INSUMOS + '/:id', insumosRoutes.updateInsumo) // Actualizar insumo
  app.put(URL_INSUMOS + '/softdelete/:id', insumosRoutes.softdeleteInsumo) // Borrado lógico
  app.put(URL_INSUMOS + '/softundelete/:id', insumosRoutes.softundeleteInsumo) // Restaurado lógico
  app.delete(URL_INSUMOS + '/harddelete/:id', insumosRoutes.hardDeleteInsumo) // Borrado físico

  //Detalle Ingredientes
  //Domicilios
  //Platos

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
}; //exports.assignRoutes
