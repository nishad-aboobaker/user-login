import schema from "./user.model.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;
export async function addUser(req, res) {
  try {
    const { username, Password, name } = req.body;
    const usr = await schema.findOne({ username });
    if (usr) return res.status(404).send({msg:"Username already exist"});
    if (!(username && Password && name))
      return res.status(404).send({msg:"Fields are empty"});
    bcrypt
      .hash(Password, 10)
      .then((hashedPwd) => {
        return res.status(201).send( schema.create({ name, username, Password: hashedPwd }));
      })
      
      .catch((error) => {
        console.log(error);
        res.status(404).send({msg:error});
      });
  } catch (error) {
    console.log(error);
  }
}

export async function login(req, res) {
  const { username, Password } = req.body;
  const usr = await schema.findOne({ username });
  if (usr === null)
  {return res.status(404).send({msg:"username doesnt exist"});}
  const success = await bcrypt.compare(Password, usr.Password);
  if (success !== true)return res.status(404).send({msg:"username and password doesnt match"});
  const token = await sign({ usr }, process.env.JWT_KEY, { expiresIn: "24h" });
  res.status(201).send({ msg: "Successfully loged in", token });
  res.end();
}

export async function home(req, res) {
  try {
    const { name } = req.user.usr;
    res.status(200).send({ msg: `hello ${name}` });
  } catch (error) {
    res.status(404).send;
  }
}
