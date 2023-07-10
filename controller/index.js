//Controlador de rutas
const fs = require('fs');
const path = require('path');
const view = path.join(__dirname, '..', 'public');
const ejs = require('ejs');
const querystring = require('querystring');

//importando modelos
const notes = require('../models/notes');
const loginSystem = require('../models/users');

//Exportando funciones de controladores de rutas
module.exports = {
    //Página principal al cargar será el login
    index(req, res) {
        fs.readFile(path.join(view ,'login.html'), 'utf-8', (err, html) => {
            res.writeHead(200, { "Content-Type": 'text/html' });
            res.end(html);
        });
    },
    //Página de inicio una vez loggeado
    home(req, res){        
        notes.getNotes()
            .then((result)=>{
                fs.readFile(path.join(view ,'index.html'), 'utf-8', (err, html) => {
                    res.writeHead(200, { "Content-Type": 'text/html' });
                    const renderedHTML = ejs.render(html, { data:result });
                    res.end(renderedHTML);
                });
            })
            .catch(error=>{
                fs.readFile(path.join(view ,'index.html'), 'utf-8', (err, html) => {
                    res.writeHead(200, { "Content-Type": 'text/html' });
                    const renderedHTML = ejs.render(html, { data:[{title:"", description:""}] });
                    res.end(renderedHTML);
                });
            });
        
    },
    //Para validar los datos del login
    login(req, res) {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        })

        req.on('end', () => {
            const formData = querystring.parse(body)
            console.log(formData);
            const {email, pass} = formData;
            
            loginSystem.login(email, pass)
            .then(()=>{
                res.writeHead(302, { 'Location': '/home' });
                res.end()
            })
            .catch(()=>{
                console.log("NOOO");
                res.writeHead(302, { 'Location': '/' });
                res.end()
            });
        });
    },
    //Para ir a la página de creación de cuenta
    sigin(req, res){
        fs.readFile(path.join(view ,'sigin.html'), 'utf-8', (err, html) => {
            res.writeHead(200, { "Content-Type": 'text/html' });
            res.end(html);
        });
    },
    //Crear nueva cuenta
    createUser(req, res){
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        })

        req.on('end', () => {
            const formData = querystring.parse(body)
            console.log(formData);
            const {name, email, pass} = formData;
            
            loginSystem.register(name, email, pass)
            .then(()=>{
                res.writeHead(302, { 'Location': '/' });
                res.end()
            })
            .catch((error)=>{
                console.log(error)
                res.writeHead(500, { 'Location': '/sigin' });
                res.end()
            });
        });
    },

    newNote(req, res){
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        })

        req.on('end', () => {
            const formData = querystring.parse(body)
            const {title, description} = formData;

            notes.insertNote(title, description)
                .then(()=>{
                    res.writeHead(302, { 'Location': '/home' });
                    res.end()
                })
                .catch((error)=>{
                    res.writeHead(500, { 'Location': '/home' });
                    res.end()
                });
        });
    },

    editNote(id, req, res){        
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        })

        req.on('end', () => {
            const formData = querystring.parse(body)
            console.log(formData);
            const {title, description} = formData;

            notes.editNote(id,title, description)
                .then(()=>{
                    res.writeHead(302, { 'Location': '/home' });
                    res.end()
                })
                .catch(error=>{
                    res.writeHead(500, { 'Location': '/home' });
                    res.end()
                })
        });
    },

    deleteNote(id, req, res){
        notes.deleteNote(id)
            .then(()=>{
                res.writeHead(302, { 'Location': '/home' });
                res.end()
            })
            .catch(error=>{
                res.writeHead(500, { 'Location': '/home' });
                res.end()
            })
    }
}