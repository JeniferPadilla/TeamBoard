import user from "../model/user.js";

const existingUser = async (req,res,next)=>{ 
    
    const userId= await user.findOne({
        name: "user"})
    if(!userId) return res.status(500)
    .send({message: "no role was assigned"})

    //como agregar datos a un objeto en javascript
    //osea que al re.body ---> releId._id
    req.body.user= userId._id;
    next();
};

export default { existingUser};