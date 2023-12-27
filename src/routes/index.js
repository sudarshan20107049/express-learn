import express from 'express'
import login from '../controllers/user.js'
import staffsRouter from './staffs.js'
import studentsRouter from './students.js'
import coursesRouter from './courses.js'


const router = express.Router()

router.post("/api/v1/users/login",login)


router.use("/api/v1/staffs",staffsRouter)
router.use("/api/v1/students",studentsRouter)
router.use("/api/v1/courses",coursesRouter)

export default router