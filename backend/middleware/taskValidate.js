import task from "../model/task.js";


const existingTask = async (req,res,next)=>{ //es para hacer las validaciones

    const taskId= await task.findOne({
        name: "pepas"})
    if(!taskId) return res.status(500)
    .send({message: "no task was assigned"})

    //como agregar datos a un objeto en javascript
    //osea que al re.body ---> releId._id
    req.body.role= taskId._id;
    next();
};

export default { existingTask};

