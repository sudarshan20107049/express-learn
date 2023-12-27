import Course from '../models/course.js'
import _ from 'lodash';

const fields = ['_id','title','fees','handleBy','duration']

export const create = async (req,res) => {
    try {
        const body = req.body
        const course = new Course({ ...body })
        await course.save()
        return res.status(201).json(course)
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Something Went Wrong"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const courses= await Course.find()
        if (courses.length) {
            const cleanUp = courses.map((item) => _.pick(item, fields))
            return res.status(200).json(cleanUp)
        }
        else {
            return res.status(404).json({message:"Courses are empty"})
        }
        
    } catch (error) {
        return res.status(500).json({
            message:error.message || "Something Went Wrong"
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const id = req.params.id
        const course = await Course.findById(id)
        if (course) {
           const courseCleanUp = _.pick(course,fields)
            return res.status(200).json(courseCleanUp)
        }
        else {
            return res.status(404).json({message:`${id} not found in Courses`})
        }
        
    } catch (error) {
        return res.status(500).json({
            message:error.message || "Something Went Wrong"
        })
    }
}

export const update = async (req, res) => {
    try {
        const body = req.body
        const id = req.params.id
        const course = await Course.findByIdAndUpdate(id, { ...body }, {
            new:true
        })
        if (course) {
            return res.status(200).json(course)
        }
        else {
            return res.status(404).json({message:`${id} not found in Courses`})
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message || "Something Went Wrong"
        })
    }
}

export const remove = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const course = await Course.findByIdAndDelete(id)
        if (course) {
            return res.status(200).json({meassage:`${course?.title} course deleted successfully`})
        }
        else {
            return res.status(404).json({meassage:`${id} not found in Course`})
        }
        
    } catch (error) {
        return res.status(500).json({
            message:error.message || "Something Went Wrong"
        })
    }
}
