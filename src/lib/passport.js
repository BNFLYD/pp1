const passport = require('passport');
const Strategy = require('passport-local').Strategy;

//llamamos a la base de datos y al modulo de encriptado
const pool = require('../db');
const helpers = require('../lib/helpers');
require('../lib/helpers');

//creamos un nuevo usuario con los parametros de signup
passport.use('local.signup', new Strategy({
    usernameField: 'nombre',
    passwordField: 'clave',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const {mail} = req.body;
    const nuevo_usuario = {
        mail,
        username,
        password
    };  
    nuevo_usuario.password = await helpers.encrypt(password);
    const result = await pool.query('INSERT INTO datos SET?', [nuevo_usuario]);
    nuevo_usuario.id = result.insertId;
    return done(null, nuevo_usuario);
}));

//Guardamos al usuario dentro de una sesion.
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    const rows = await pool.query('SELECT * FROM datos WHERE id = ?', [id]);
    done(null, rows[0]);
});


// envio del login
passport.use('local.login', new Strategy({
    usernameField: 'nombre',
    passwordField: 'clave',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM datos WHERE username = ?', [username]);
    if(rows.length > 0){
        const user = rows[0];
        const valida = await helpers.login(password, user.password);
        console.log(valida);
        if (valida == true) {
            done(null, user);
        } else {
            done(null, false, req.flash('message', 'usuario o contraseña incorrectos'));
        }
    } else {
        done(null, false, req.flash('message', 'El usuario que ingreso no esta registrado'));
    }
}));