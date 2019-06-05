const express = require('express')
const router = express.Router()
const CourseService = require('../services/course.service')
const courseServices = new CourseService()

router.get('/',  async (req, res, next) => {
    try {
        const coursesData = await courseServices.getAll('list')
        if(coursesData) {
            res.render('courses/courses', { coursesData, edit: false })
        }
    } catch (e) {
        // manage error
    }
})
router.get('/new', async (req, res, next) => {
        res.render('courses/course_create')
})
router.post('/new', async (req, res, next) => {
    const newCourse = req.body
    try {
        const newCourseData = await courseServices.add(newCourse)
        res.render('courses/course_message_success', newCourseData )
    } catch (e) {
        res.render('courses/course_message_error', { message: e })
    }
})
router.get('/info/:id', async (req, res, next) => {
    try {
        const { id: course } = req.params;
        const courseData = await courseServices.get(course)
        res.render('courses/course_info', { courseData })
    } catch (e) {
        //
    }
})
router.get('/edit', async (req, res, next) => {
    try {
        const coursesData = await courseServices.getAll('edit')
        if(coursesData) {
            res.render('courses/courses', { coursesData, edit: true })
        }
    } catch (e) {
       //
    } 
})
router.get('/edit/:id', async (req, res, next) => {
    try {
        const { id: courseId } = req.params;
        const courseData = await courseServices.get(courseId);
        res.render('courses/course_edit', { courseData });
    } catch (e) {
        res.render('courses/course_message_error', { message: e })
    }
})
router.post('/edit', async (req, res, next) => {
    const courseToEdit  = req.body
    try {
        const courseMatch = await courseServices.edit(courseToEdit)
        res.render('courses/course_message_success', { courseMatch })
    } catch (e) {
        res.render('courses/course_message_error', { message: e })
    }
})
router.get('/enrolled', async (req, res, next) => {
    try {
        const usersEnrolled = await courseServices.getStudents();
        res.render('courses/course_enrolled', { usersEnrolled })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;