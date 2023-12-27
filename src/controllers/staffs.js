import Staff from '../models/staff.js'
import { hash } from 'bcrypt'
import _ from 'lodash'

const fields = ['_id','name', 'email', 'role', 'mobile', 'courseHandling']

const courseFields =['_id','title','duration','fees']

export const create = async (req,res) => {
    try {
        const body = req.body
        
        // if (!body) {
        //     return res.status(204).json({message:"empty body content"})
        // }
        
        
        const staff = new Staff({...body})
        const hashpassword = await hash(body.password, 10)
        staff.password = hashpassword
        await  staff.save()
        return res.status(201).json(staff) 
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Something Went Wrong"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const staffs = await  Staff.find().populate("courseHandling")
         if (staffs.length) {
             const cleanUp = staffs.map((item) => {
                 
                //  pick required fields in staff
                 const cleanedStaff = _.pick(item, fields)

                //  pick required fields in course
                 const cleanedCourse = item.courseHandling.map((course) => _.pick(course, courseFields))

                 return {...cleanedStaff,courseHandling:cleanedCourse}
            })
            return res.status(200).json(cleanUp)
        }
        else {
            return res.status(404).json({message:"Staffs are empty"})
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
        const staff = await Staff.findById(id)
        if (staff) {
            return res.status(200).json(staff)
        }
        else {
         return res.status(404).json({message:`${id} can't find this Staff`})   
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message || "Something Went Wrong"
        })
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const staff = await Staff.findByIdAndUpdate(id, body, {
            new:true
        })
        if (staff) {
           return res.status(200).json(staff)
        }
        else {
            return res.status(404).json({message:`${id} can't find this staff `})
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
        const staff = await Staff.findByIdAndDelete(id)
        if (staff) {
            return res.status(200).json({message:`${staff.name} staff deleted successfully `})
        }
        else {
            return res.status(404).json({message:`can't find this id ${id}`})
        }
        
    } catch (error) {
        return res.status(500).json({
            message:error.message || "Something Went Wrong"
        })
    }
}
