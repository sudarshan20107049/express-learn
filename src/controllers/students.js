import Student from "../models/student.js"

export const create = async (req,res) => {
    try {
        const body = req.body
        const student = new Student({ ...body })
        await student.save()
        return res.status(201).json(student)
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Something Went Wrong"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const students = await Student.find().populate('courseTaken')
        if (students.length) {
            return res.status(200).json(students)           
        }
        else {
            return res.status(204).json({message: "empty Students"})
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
        const student = await Student.findById(id)
        if (student) {
            return res.status(200).json(student)
        }
        return  res.status(404).json({message:`${id} cannot find this id`})    
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
        const student = await Student.findByIdAndUpdate(id, { ...body }, {
            new:true
        })
        if (student) {
            return res.status(200).json(student)
        }
        return  res.status(404).json({message:`${id} cannot find this id`})    

        
    } catch (error) {
        return res.status(500).json({
            message:error.message || "Something Went Wrong"
        })
    }
}

export const remove = async (req, res) => {
    try {
         const id = req.params.id
        const student = await Student.findByIdAndDelete(id)
        if (student) {
            return res.status(200).json({message:`${student.name}student was deleted successfully`})
        }
        return  res.status(404).json({message:`${id} cannot find this id`})
        
    } catch (error) {
        return res.status(500).json({
            message:error.message || "Something Went Wrong"
        })
    }
}
