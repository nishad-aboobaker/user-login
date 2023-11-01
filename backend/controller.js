import schema from "./user.model.js";
import bcrypt from "bcrypt";
import pkg from 'jsonwebtoken';
const { sign } = pkg;
export async function addUser(req,res)
{
    
    try {
        
        const {username,Password}=req.body;
        const usr=await schema.findOne({username})
        if(usr)
        return res.status(404).send("Username already exist")
        if(!(username&&Password))
        return res.status(404).send("Fields are empty")
        bcrypt.hash(Password,10)
        .then((hashedPwd)=>{
            schema.create({username,Password:hashedPwd});
        })
        .then(()=>{
            res.status(201).send("Successfully registered")
        })
        .catch((error)=>{
            console.log(error);
            res.status(500).send(error)
        })
    } catch (error) {
        console.log(error);
    }
  
    
}

export async function login(req,res){
    const {username,Password}=req.body;
    const usr=await schema.findOne({username})
    if(usr===null)
    return res.status(404).send("username or password doesnt exist");
    const success=await bcrypt.compare(Password,usr.Password)
    if(success!==true)
    return res.status(404).send("username and password doesnt match")
    const token= await sign({username},process.env.JWT_KEY,{expiresIn:"24h"})
    res.status(201).send({msg:"Successfully loged in",token})
    res.end();

}

