import { connect } from "mongoose";

const connectDB = async () => {
    try {
        await connect(process.env.DB_URI)
        console.log("Connected DB SuccessFully")
        
    } catch (error) {
        console.log("While error on Connecting Database",error.message)
    }
}

export default connectDB