const express = require('express');
const router = express.Router();
const UserServices = require('../services/user.service');
const CourseServices = require('../services/course.service');

const userServices = new UserServices()
const courseServices = new CourseServices()

router.get('/', async (req, res, next) => {
    try {
        const { users } = await userServices.get()
        const courses = await courseServices.getAll()
        if (users) {
            res.render({users})
        }
    } catch (e) {
        return next
    }
})

router.post('/inscription/:id', async (req, res, next) => {
    const { id: course } = req.params;
    const user = req.body;
    try {
        const newInscriptionSuccess = await userServices.inscription( user,course)
        if (newInscriptionSuccess) {
            res.render('courses/course_message_success')
        }
    } catch (error) {
        res.render('courses/course_message_error', {message: error})
    }
})
router.get('/register', async (req, res, next) => {

        res.render('users/user_register');
})
router.post('/register', async ( req, res, next) => {
    try{
        const userData = req.body;
        const newUser = await userServices.registerNewUser(userData);
        if(newUser) {
            res.render('courses/course_message_success')
        }
    } catch (error) {
        res.render('courses/course_message_error', {message: error})
    }
})

router.get('/delete/:id', async (req, res, next ) => {
    try {
        const { id: studentToDelete } = req.params;
        const deletedStudent= await userServices.delete(studentToDelete);
        console.log(deletedStudent);
        if (deletedStudent) {
            res.redirect('/courses')
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router