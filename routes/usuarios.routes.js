const usuariosDomain = require("../domain/usuarios.domain");

exports.getUsuarios = (req,res) => {
    usuariosDomain.getUsuarios().then((usuarios) => {
        res.json(usuarios)
    })
    .catch((err) => {
        console.log("Error -> usuarios.routes -> getUsuarios -> " + err);
        res.json(err)
    })
}//exports.getUsuarios

exports.getUsuario = (req,res) => {
    usuariosDomain.getUsuarioByEmail(req.params.email).then((usuario) => {
        res.json(usuario)
    })
    .catch((err) => {
        console.log("Error -> usuarios.routes -> getUsuario -> " + err);
        res.json(err)
    })
}//exports.getUsuario