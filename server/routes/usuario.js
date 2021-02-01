const express = require('express');
const Usuarios = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();



app.get('/usuario', (req, res) => {


    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite  = req.query.limite || 5;
    limite = Number(limite);

 Usuarios.find({}, 'nombre email google').skip(desde).limit(limite).exec((err, usuario) => {
     if(err){
         res.status(400).json({
             ok:false,
             err
         })
     }
     Usuarios.count({}, (err, conteo) => {
        res.json({
            ok: true,
            usuario,
            cantidadUsuario: conteo
        })
     })
    
 })
});


app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuarios({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role:body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err){
           return  res.status(400).json({
                ok:false,
                err
            });
        }

        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
  
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body =_.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    
    

    Usuarios.findByIdAndUpdate(id, body, {new: true, runValidators: true},(err, usuarioDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
               
        res.json({
            ok:true,
            usuario: usuarioDB
        })
    })

  
});

app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;

    Usuarios.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if(err){
            res.status(400).json({
                ok:false,
                err
            });
        }
        if(!usuarioBorrado){
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'Usuario no encontrado'
                }
            });
        }
        res.json({
            ok:true,
            usuario:usuarioBorrado
        })
    })
})



module.exports = app;
