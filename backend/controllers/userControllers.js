import user from "../model/user.js";
import bcrypt  from "bcrypt"; //para encriptar la contraseña
import  jwt from "jsonwebtoken";  //para una clave encriptada  de la informacion del usuario, para cuando se registre un usuario de un token
import moment from "moment"; //para temas de las fechas


const registerUser = async(req,res)=>{
    if(!req.body.name || !req.body.password)
    return res.status(400).send({message: "Incomplete data"});

    // console.log(req.body);
    const passHash = await bcrypt.hash(req.body.password, 10); //para encriptar la contraseña

    const userSchema = new user({
        name: req.body.name,
        email: req.body.email,
        password:passHash,
        role:req.body.role,  //el user es como un json que trae cuando hay un usuario registrandose
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
    let users= await user
    .find({ $and: [{name: new RegExp(req.params["name"])},{dbStatus:"true"}],})
    .populate("role")
    .exec();  //para traer la lista de todos- users es un array, el populate es para indicar algo exacto para mostrar
    if (users.length == 0)
    return res.status(400).send({message:"No search results"});
    return res.status(200).send ({users});
//la funcion para hacer filtros find( aqui va una expresion regular:osea que acepta tpodo el RegExp)
};

const login = async(req, res)=>{
    
    const userLogin= await user.findOne({email: req.body.email});
    if(!userLogin) return res.status(400).send({message:"Email no found"}); // para que verifique el email


    if (!userLogin.dbStatus) return res.status(400).send({message:"User no found"}); //para que verifique el dbStatus

    const passhash =await bcrypt.compare(req.body.password,userLogin.password);

    if(!passhash)
    return res.status(400).send({message:"password no found"});
   
    try {
        return res.status(200).json({    //se pone .json para los jsonwebtoken
            token: jwt.sign({           //asi se crea el jsonwebtoken jwt
            _id: userLogin._id,
            name: userLogin.name,         //aqui se hace una copia de la db
            role: userLogin.role,        //se ponen los nombres como estan en la db osea com esta en model
            iat: moment().unix()              //para generar la fecha de ingreso, el moment para encriptar la fecha
            },
            process.env.SK_JWT
            ),
        });
    } catch (e) {
return res.status(500).send({message: "Register error"});
    }
};

const listAdmin = async (req, res) => {
    let users = await user
    .find({ name: new RegExp(req.params["name"])})
    .populate("role")
    .exec();
    if(users.length === 0)
    return res.status(400).send({ message: "No search results"})

    return res.status(200).send({ users})
};

const deleteUser = async(req, res)=>{
    if (!req.params["_id"])
     return res.status(400).send({message:"Imcomplete data"})

    const users = await user.findByIdAndDelete(req.params["_id"], {dbStatus:false,})

    return !users
     ? res.status(400).send({message:"Error deleting user"})
     : res.status(200).send({message: "user deleted"});
};

const updateUserAdmin = async (req, res)=>{

    if (!req.body._id || !req.body.name || !req.body.role || !req.body.email)
    return res.status(400).send({message:"Incomplete data"});

    let pass ="";

    if (!req.body.password){
        const findUser = await user.findOne({email:req.body.email});
        pass = findUser.password;
    }else{
        pass = await bcrypt.hash(req.body.password,10);
    }

    const editUser = await user.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        password: pass,
        role:req.body.role,

    });
    if (!editUser) return res.status(500).send({message:"Error editing user"})
    return res.status(200).send({message:"user updated"});
};

export default {registerUser, listUser, login, listAdmin ,deleteUser, updateUserAdmin};



