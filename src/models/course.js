import { Schema, model } from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique:true
    },
    fees: {
        type: Number,
        required:true
    },
    duration: {
        type: Number,
        required:true
    },
    handleBy: {
        type: [Schema.ObjectId],
        ref:'Staff'
    }

}, {
    timestamps: true,
    overwriteModels:true
})

const Course = model("Course", courseSchema)

export default Course