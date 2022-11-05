// llamamos a las dependencias del servidor
const express = require('express');
//sirve para crear el server.
const morgan = require('morgan');
//muestra por consola el estado del servidor.
const {engine} = require('express-handlebars');
//es un motor de plantillas.
const path = require('path');
//verifica si el entorno es mac linux o windows y concatena las direcciones usando los caracteres correspondientes.
const session = require('express-session');
//sirve para almacenar datos de paginas para reenviarlos.
const flash = require('connect-flash');
//automatiza funciones con session para crear mensajes de confirmacion y enviar datos.
const DataMySQL = require('express-mysql-session')(session);
//almacena los datos en una base de datos MySQL.
const passport = require('passport');
//automatiza funciones con session para enviar y verificar los datos que le pasemos.

//iniciamos
const app = express();
const { database } = require('./keys');
require('./lib/passport');

// configuramos el servidor y las dependencias
app.set('port', process.env.PORT || 3000);
//establecemos el puerto del server
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    exthname: '.hbs',
    helpers: require('./lib/hbs')
}));
app.set('view engine', '.hbs');

// Middlewares (funciones intermedias sirven para procesar informacion antes de llevarla a sus respectivas rutas)
app.use(morgan('dev'));
//muestra en la consola los codigos de confirmacion error y crasheo.
app.use(express.urlencoded({extended: false}));
//sirve para comprender los datos de los formularios.
app.use(express.json());
//sirve para comprender los datos en formato json.
app.use(session({
    secret:'key',
    resave: false,
    saveUninitialized: false,
    store:new DataMySQL(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


//Variables globales
app.use((req,res,next) =>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

//Rutas
app.use(require('./routes/'));
app.use(require('./routes/authentication'));
// app.use('/links', require('./routes/links'));

//Acceso publico del usuario
app.use(express.static(path.join(__dirname,'public')))

//seteamos un puerto por defecto en caso de que ya halla uno tomare ese
app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto ', app.get('port'));
});