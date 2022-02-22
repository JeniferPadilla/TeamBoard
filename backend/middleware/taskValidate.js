import user from "../model/user.js";


const existingIdUser = async (req,res,next)=>{ //es para hacer las validaciones

    const userId= await user.findOne({
        name: "pepas"})
    if(!userId) return res.status(500)
    .send({message: "no task was assigned"})

    //como agregar datos a un objeto en javascript
    //osea que al re.body ---> releId._id
    req.body.user= userId._id;
    next();
};

export default { existingIdUser};

