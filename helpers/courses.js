const fs = require('fs');
let listaCursos = [];

const check = (id) => listaCursos.find(curso => curso.id === id)
const listar = () => {
    try {
        return listaCursos = require('../cursos.json');
    } catch(err) {
        return listaCursos = []
    }
}
const crear = (course, cb) => {
    listar();
    if(check(course.id)) return cb("El curso ya se encuentra en el sistema")
    course.state= 'disponible'
    listaCursos.push(course);
    listaCursos = JSON.stringify(listaCursos);
    guardar((err) => {
        if (err) return cb(err, null);
        return cb(null, course)
    });
    
}
const guardar = (cb) => fs.writeFile('cursos.json', listaCursos, (err) => cb(err))

const obtenerCurso = (courseId, cb) => {
    listar()
    const curso = check(courseId)
    if(curso) return cb(null, curso)
    cb('El curso no se encuentra');
}
const editarCurso = (courseData, cb) => {
    listar();
    const curso = check(courseData.id)
    if (curso) {
        listaCursos.map((data, key) => {
            if(data.id === courseData.id){
                listaCursos[key] = courseData;
            }
        })
        listaCursos = JSON.stringify(listaCursos);
        return guardar((err) => {
            if (err) return cb(err, null);
            return cb(null, courseData)
        });
    }
    return cb('El curso no se encuentra', null)
}

module.exports = {
    crear,
    listar,
    obtenerCurso,
    editarCurso
}