const fs = require('fs');
let listaUsuarios = [];

const checkUser = (id) => listaUsuarios.find(usuario => usuario.id === id);

const guardar = (cb) => {
    listaUsuarios = JSON.stringify(listaUsuarios);
    fs.writeFile('usuarios.json', listaUsuarios, (err) => {
        if(err) cb(err)
        cb(null)
    })
} 

const listar = () => {
    try {
        return listaUsuarios = require('../usuarios.json');
    } catch(err) {
        return listaUsuarios = []
    }
}

const crearUsuario = (user, cb) => {
    listar();
    const check = checkUser(user.id);
    if(checkUser(user.id)){
        return cb('El usuario ya existe')
    } 
    user.coursesInscription = []
    listaUsuarios.push(user);
    guardar((err) => {
        if (err) return cb(err, null);
        return cb(null, user)
    });
}

const addCourseToUser = (user, course, cb) => {
    listar();
    listaUsuarios = listaUsuarios.map(usuario => {
        if(usuario.id === user.id) {
            usuario.coursesInscription.push(course)
        }
        return usuario
    })
    guardar((err) => {
        if (err) return cb(err, null);
        return cb(null, course)
    });
}
const checkCourse = ( user, curso) => {
    listar()
    return user.coursesInscription.find(course => course === curso)
}

const inscription = (user, curso, cb) => {
    listar();
    const userToInscription = checkUser(user.id)
    if(userToInscription) {
        if(checkCourse(userToInscription,curso)) {
            return cb('ya estas inscrito en este curso', null)
        }
        addCourseToUser(user, curso, (error) =>{
            if(!error) cb(null, 'usuario Agregado correctamente');
        })
    }
    crearUsuario(user, (err) => {
        if(!err) {
            addCourseToUser(user, curso, (error) =>{
                if(!error) cb(null, 'usuario Agregado correctamente');
            })
        }
    })
}
const eliminarUsuario = (userToDelete,cb) => {
    listar()
    listaUsuarios = listaUsuarios.filter(user => user.id !== userToDelete)
    guardar((err) => {
        if (err) return cb(err, null);
        return cb(null, userToDelete)
    });
}

module.exports = {
    checkUser,
    listar,
    crearUsuario,
    inscription,
    eliminarUsuario
}



