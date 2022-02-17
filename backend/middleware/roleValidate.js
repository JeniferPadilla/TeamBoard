import role from "../model/role.js";

const existingRole = async (req,res,next)=>{ //es para hacer las validaciones

    const roleId= await role.findOne({name: "user"})
    if(!roleId) return res.status(500).send({message: "no role was assigned"})

    //como agregar datos a un objeto en javascript
    //osea que al re.body ---> releId._id
    req.body.role= roleId._id;
    next();
};

export default { existingRole};
