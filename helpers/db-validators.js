const Role = require("../models/role");
const Usuario = require("../models/usuario");


const esRolValido = async (rol='') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
            throw new Error (`El rol ${rol} no existe en la base de datos`);
    }
}
const emailExiste =  async(correo='') =>{
//Verificar si el correo existe
const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo: ${correo} ya esta registrado`);
    }
}

const existeUsuarioPorId =  async(id) =>{
    const existeId = await Usuario.findById(id);
        if(!existeId){
            throw new Error(`El id ${id} no existe`);
        }
    }

module.exports = { esRolValido, emailExiste, existeUsuarioPorId };