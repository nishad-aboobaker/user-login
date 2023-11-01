import mongoose from "mongoose";


const schema=new mongoose.Schema({
    username:{type:String,
    required:[true,"Username is required"],
    unique:[true,"username already exist"]
    },
    Password:{type:String,
        required:[true,"Password is required"]
    }
})



export default mongoose.model.users||mongoose.model("user",schema);