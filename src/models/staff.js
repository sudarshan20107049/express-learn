import { Schema, model } from "mongoose";

const staffSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum:['admin','developer','trainer']
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    mobile: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    courseHandling: {
        type: [Schema.ObjectId],
        ref: "Course",
        required:true
    }

}, {
    timestamps: true,
    overwriteModels:true
})

const Staff = model("Staff", staffSchema)

export default Staff