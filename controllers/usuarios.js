const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = (req=request, res=response) =>{
    const {q, nombre, apikey} = req.query;
    res.json({
        msg: 'get API',
        q,
        nombre,
        apikey
    });
};

const usuariosPost =async(req, res=response) =>{

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //Guardar en base de datos
    await usuario.save()
    res.json({
        usuario
    });
};

const usuariosPut = async(req, res=response) =>{
    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new:true});
    res.json({
        msg: 'put API',
        usuario
    });
};

const usuariosDelete = (req, res=response) =>{
    res.json({
        msg: 'delete API'
    });
};

const usuariosPath = (req, res=response) =>{
    res.json({
        msg: 'patch API'
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPath
}