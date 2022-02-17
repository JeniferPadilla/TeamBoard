import user from "../model/user.js";
import bcrypt  from "bcrypt"; //para encriptar la contraseña
import  jwt from "jsonwebtoken";  //para una clave encriptada  de la informacion del usuario, para cuando se registre un usuario de un token
import moment from "moment"; //para temas de las fechas

const registerUser = async(req,res)=>{
    if(!req.body.name || !req.body.password)
    return res.status(400).send({message: "Incomplete data"});

    console.log(req.body);
    const passHash = await bcrypt.hash(req.body.password, 10); //para encriptar la contraseña

    const userSchema = new user({
        name: req.body.name,
        email: req.body.email,
        password:passHash,
        role:req.user,  //el user es como un json que trae cuando hay un usuario registrandose
        dbStatus:true,
    });

    const result =await userSchema.save();

    if (!result) return res.status(500).send({message:"Failed to register user"});

    try {
        return res.status(200).json({    //se pone .json para los jsonwebtoken
            token: jwt.sign({           //asi se crea el jsonwebtoken jwt
            _id: result._id,
            name: result.name,         //aqui se hace una copia de la db
            role: result.role,        //se ponen los nombres como estan en la db osea com esta en model
            iat: moment().unix()              //para generar la fecha de ingreso, el moment para encriptar la fecha
            },
            process.env.SK_JWT
            ),
        });
    } catch (e) {
return res.status(500).send({message: "Register error"});
    }
};

const listUser =async(req,res)=>{
    let users= await user.find().populate("role").exec();  //para traer la lista de todos- users es un array, el populate es para indicar algo exacto para mostrar
    if (users.length == 0)
    return res.status(400).send({message:"No search results"});
    return res.status(200).send ({users});
//la funcion find()
};


export default {registerUser, listUser};



