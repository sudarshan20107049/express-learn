import { compare } from "bcrypt"
import json  from "jsonwebtoken"
import Staff from "../models/staff.js"

const login = async (req, res) => {
    try {
        const body = req.body
        const staff = await Staff.findOne({
            $or: [
                {
                    email:body.data
                },
                {
                    mobile:body.data
                }
            ]
        })
        if (staff) {
            const hashedPassword = staff.password
            const newPassword = body.password
            const isMatched = await compare(newPassword, hashedPassword)
            if (isMatched) {
                const token = await json.sign({ ...staff }, process.env.TOKEN_SECRET)
                if (token) {
                    return res.status(200).json(token)
               }
            throw new Error()
            }
            else {
                return res.status(403).json({message:'Invalid Password'})
            }
            
        }
        else {
            return res.status(403).json({message:`can't find staff this email or number`})
        }
        
    } catch (error) {
        return res.status(500).json(error.message||"Something Went Wrong")
    }
    
}

export default login