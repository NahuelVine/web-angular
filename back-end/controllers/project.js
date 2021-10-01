'use strict'

var Project = require("../models/project");
var fs = require('fs');
var path = require('path');

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: "Soy home"
        });
    },
    test: function(req, res){
        return res.status(200).send({
            message: "Soy el metodo test del controlador proyecto"
        });
    },
    saveProject: function(req, res){
        var project = new Project();
        var params = req.body;

        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.langs = params.langs;
        project.year = params.year;
        project.image = null;

        project.save((err, projectStored)=>{
            if(err) return res.status(500).send({message: "Error al guardar"});

            if(!projectStored) return res.status(404).send({message: "No se pudo guardar el proyecto"});

            return res.status(200).send({project: projectStored});
        });
    },
    getProject: function(req,res){
        var projectId = req.params.id;

        if(projectId == null) return res.status(404).send({message: "el proyecto no existe"});

        Project.findById(projectId,(err,project)=>{
            //With error
            if(err) return res.status(500).send({message: "error al devolver los datos"});
            if(!project) return res.status(404).send({message: "el proyecto no existe"});
            //Without error
            return res.status(200).send({
                project
            });
        });
    },
    getProjects: function(req,res){
        Project.find({}).sort("name").exec((err,projects)=>{
            if(err) return res.status(500).send({message: "Error al devolver los datos"});
            if(!projects) return res.status(404).send({message: "No se pudo mostrar los projectos"});
            return res.status(200).send({projects});
        });
    },
    updateProject: function(req,res){
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new:true}, (err,projectUpdate)=>{
            if(err) return res.status(500).send({message: "Error al hacer el update de los datos"});
            if(!projectUpdate) return res.status(404).send({message: "Error al obtener los datos especificos"});
            return res.status(200).send({
                project: projectUpdate
            });
        });
    },
    deleteProject: function(req,res){
        var projectId = req.params.id;

        Project.findByIdAndDelete(projectId,(err,projectDelete)=>{
            if(err) return res.status(500).send({message:"Error al borrar los datos"});
            if(!projectDelete) return res.status(404).send({message:"No se encontraron los datos a borrar"});
            return res.status(200).send({
                project: projectDelete
            })
        });
    },
    uploadImage: function(req,res){
        var projectId = req.params.id; 
        if(req.file){
            var filePath = req.file.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = req.file.originalname.split('.');
            var fileExt = extSplit[1];
            if(fileExt== 'png' || fileExt== 'gif' || fileExt== 'jpg' || fileExt == 'jpeg'){
                Project.findByIdAndUpdate( projectId, {image: fileName}, {new:true}, (err,projectUpdated)=>{
                    if(err) return res.status(500).send({message:"Error al añadir la imagen"});
                    if(!projectUpdated) return res.status(404).send({message:"Error al encontrar los datos especificos"});
                    return res.status(200).send({project: projectUpdated});
                });
            }else{
              res.status(200).send({message: 'Extension del archivo no valida'});
            }
        }else{
            res.status(200).send({message: 'No has subido ninguna imagen..'});
        }
    },
    getImageFile: function(req,res){
        var file = req.params.image;
        var pathFile = "./uploads/" + file;

        fs.exists(pathFile,(exists)=>{
            if(exists){
                return res.sendFile(path.resolve(pathFile));
            }else{
                return res.status(200).send({message: "No se pudo conseguir la imagen"});
            }
        });
    }
};

module.exports = controller;