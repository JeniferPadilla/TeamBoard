import role from "../model/role.js"

const registerRole = async (req, res)=>{  //el async es para que esta funcion tenga asincronismo
    if(!req.body.name || !req.body.description) // se pone el if sin {} para indicar que se cumple esa linea del if sino para el if y listo,se pone !al principio del req para ver lo diferente de la respuesta
    return res.status(400).send({message: "Incomplete data"}); //respuesta que vamos a dar

    let schemaRole= new role({     //le dice a la variable que cree una nueva estructura de las que role tiene
        name:req.body.name,       //el body es todo el json
        description:req.body.description,
        dbStatus: true,
    });
    let result = await schemaRole.save(); // se crea una variable  result que le dice que ya la variable schemaRole esta lista para guardar y le envia a model role para que pueda guardar en mongo la informacion, y el await.
    if(!result)
    return res.status(500).send({message: "Error to register role"});

    res.status(200).send({result});
};

const listRole =async(req,res)=>{

    let roles= await role.find();  //para traer la lista de todos- users es un array, el populate es para indicar algo exacto para mostrar
    if (roles.length == 0)
    return res.status(400).send({message:"No search results"});

    return res.status(200).send ({roles});
//la funcion find()
};

const deleteRol = async(req, res)=>{

    if(!req.params["_id"])
    return res.status(400).send({message:"Incomplete data"});

    const roles =await role.findByIdAndUpdate(req.params["_id"], {dbStatus: false,})

    return !roles
    ? res.status(400).send({message:"Error deliting user"})
    : res.status(200).send({message:"User delete"})
  };

const updateRol = async (req, res)=>{

    if (!req.body._id || !req.body.name || !req.body.description)

    return res.status(400).send({message:"Incomplete data"});

    const ediRol = await role.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        description: req.body.description,
    });
    if (!ediRol) return res.status(500).send({message:"Error editing role"})
    return res.status(200).send({message:"Role updated"});
};


export default {registerRole, listRole, deleteRol, updateRol}; //se ponen en llave por que aqui habran muchas funciones

