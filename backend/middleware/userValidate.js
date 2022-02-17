import user from "../model/user.js";

const existingUser = async (req,res,next)=>{  //el next es para decire que si todo esta bien continue con el proceso

    if( !req.body.email)
    return res.status(400).send({message: "Incomplete data"});

    const existingEmail = await user.findOne({email: req.body.email});//es para verificar si el usuario existe en db, y verificar si ese correo esta con findOne
    if (existingEmail) return res.status(400).send({message: "The User is already registered"});

    next();
};

export default{existingUser};