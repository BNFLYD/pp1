const bcrypt = require('bcryptjs');
//Es un modulo que encripta un string en hashes de un largo por caracter que nosotros determinemos
const helpers = {};

//modulo de encriptado
helpers.encrypt = async (password) =>{
    const salt = await  bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};
//modulo de comprobacion de claves encritadas
helpers.login = async (password, clave_db) => {
    return await bcrypt.compare(password, clave_db);
}


module.exports = helpers;