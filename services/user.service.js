const CourseService = require('./course.service');
const utils = require('../helpers/users.js')
class UserService {
    constructor(token) {
    }
    getAll() {
        return new Promise ((resolve) => {
            const cursos = utils.listar();
            resolve(cursos)
        })
    }
    
    inscription(user, curso) {
        return new Promise ((resolve, reject) => {
            utils.inscription(user, curso, (err, success) => {
                if(err) return  reject(err)
                resolve(success)
            })
            
        })
    }

    registerNewUser( userData) {
        return new Promise ((resolve, reject) => {
            utils.crearUsuario(userData, (err,success) => {
                if(err) return reject(err)
                resolve(success)
            })
        })
    }
    delete(user){
        return new Promise ((resolve, reject) => {
            utils.eliminarUsuario(user, (err, success) => {
                if(err) return reject(err)
                resolve(success)
            })
        })
    }
}
module.exports = UserService