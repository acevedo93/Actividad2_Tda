const utils = require('../helpers/courses');
const UserServices = require('../services/user.service');

class CourseService {
    add(course) {
       return new Promise ((resolve, reject)=> {
            utils.crear(course, (err) => {
                if(!err) {
                    return resolve(course)
                }
                return reject(err)
            })})
    }
    get(courseId) {
        return new Promise ((resolve, reject) => {
            utils.obtenerCurso(courseId, (err, courseData) => {
                if(!err) {
                    return resolve(courseData)
                }
                return reject(err)
            })
        })
    }
    getAll(type) {
        return new Promise ((resolve) => {
            let cursos = utils.listar();
            if(type === 'list') {
                cursos = cursos.filter(curso => curso.state === 'disponible')
            }
            resolve(cursos)
        })
    }
    delete(){
    }
    edit(courseData){
        return new Promise ((resolve, reject) => {
            utils.editarCurso(courseData, (err, courseMatch) => {
                if(!err) {
                   return resolve(courseMatch)
                }
                return reject(err)
            })
        })
    }
    getStudents(){
        const userService = new UserServices();
        return  new Promise ( async (resolve, reject) => {
            try {
                let newData = [];
                const students = await userService.getAll();
                let courses = await this.getAll('list');
                courses.map(course => {
                    course.enrolled = [];
                    students.map(student => {
                        if(student.coursesInscription[0] === course.id){
                            course.enrolled.push(student);
                        }
                    })
                    return newData.push(course);
                })
                resolve(newData);
            } catch (error) {
                return reject(error)
            }
        })
    }
}
module.exports = CourseService