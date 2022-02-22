import task from "../model/task.js";
import bcrypt  from "bcrypt";
import  jwt from "jsonwebtoken";
import moment from "moment";
import user from "../model/user.js";


const registerTask = async(req,res)=>{
    
    if(!req.body.name ||
       !req.body.description ||
       !req.body.taskStatus ||
       !req.body.ImageUrl)
    return res.status(400).send({message: "Incomplete data"});

      //el next es para decire que si todo esta bien continue con el proceso

        const existingUser = await user.findOne({email: req.body.user});//es para verificar si el usuario existe en db, y verificar si ese correo esta con findOne
        if (existingUser) 
        return res.status(400).send({message: "The User is already registered"});

        console.log(existingUser);

    const taskSchema = new task({
        name: req.body.name,
        description: req.body.description,
        ImageUrl: req.body.ImageUrl,
        taskStatus: req.body.taskStatus,
    });

    const result =await taskSchema.save();

    if (!result) return res.status(500).send({message:"Failed to register task"});

    try {
        return res.status(200).json({    //se pone .json para los jsonwebtoken
            token: jwt.sign({           //asi se crea el jsonwebtoken jwt
            _id: result._id,
            name: result.name,         //aqui se hace una copia de la db
            description: result.description,        //se ponen los nombres como estan en la db osea com esta en model
            iat: moment().unix()              //para generar la fecha de ingreso, el moment para encriptar la fecha
            },
            process.env.SK_JWT
            ),
        });
    } catch (e) {
return res.status(500).send({message: "Register error"});
    }
};

const listTask =async(req,res)=>{

    let tasks= await task
    .find({name: new RegExp(req.params["name"])})
    .populate("name")
    .exec();
    if (tasks.length == 0)
    return res.status(400).send({message:"No search results"});
    return res.status(200).send ({tasks});
};

const deleteTask = async(req, res)=>{

    if (!req.params["_id"])
     return res.status(400).send({message:"Imcomplete data"})

    const tasks = await task.findByIdAndDelete(req.params["_id"])

    return !tasks
     ? res.status(400).send({message:"Error deleting task"})
     : res.status(200).send({message: "Task deleted"});
};

const updateStatusTask= async (req, res)=>{

    if (!req.body.taskStatus)
    return res.status(400).send({message:"Incomplete data"});

    const editStatus = await task.findByIdAndUpdate(req.body._id, {
        taskStatus: req.body.taskStatus,
    });
    if (!editStatus) return res.status(500).send({message:"Error editing status task"})
    return res.status(200).send({message:"Status task  updated"});
};

export default{registerTask, listTask,deleteTask, updateStatusTask};

