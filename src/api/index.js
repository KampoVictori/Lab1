import {Router} from "express";

const apiRouter = new Router();

let data = [
    {
        id:"0",
        name:"Щукінн Л.Д.",
        position:"Адміністратор",
        salary:"15000",
        count_kids:"2",
        experience:"10"
    },
    {
        id:"1",
        name:"Вал Ю.Н.",
        position:"Покоївка",
        salary:"7000",
        count_kids:"1",
        experience:"5"
    },
    {
        id:"2",
        name:"Дроб П.Т.",
        position:"Портьє",
        salary:"10000",
        count_kids:"2",
        experience:"7"
    }
];

apiRouter.get("/", (req, res) =>{
    res.send(data);
     });
apiRouter.get("/:id", (req, res) =>{
    let name = data.find(name=>name.id==req.params.id);
    if(name)
    {
        res.send(name);}
    else
        res.status(404).send("Not Found");
    });
apiRouter.post("/", (req, res) =>{
    data.push(req.body);
    res.send(data);
});

apiRouter.post("/delete/:id", (req, res) =>{
    let index = req.params.id;
    data.splice(index,1);
    res.send(data);
});

apiRouter.post("/about", (req, res) =>{
    let position = req.query.position;
    let count = req.query.count_kids;
    let name = data.find(name=>name.position==position || name.count_kids<=count);
    res.send(name);
    });

apiRouter.post("/add", (req, res) =>{
    if(Array.isArray(req.body))
    {
        data.push(...req.body);
    }
    else
    {
        data.push(req.body);
    }
    res.send(data);
});

apiRouter.put("/replace/:id", (req, res) =>{
    let name = data.find(name=>name.id==req.params.id);
    if(req.body.name!=null)
    {
        name.name=req.body.name;
    }
    if(req.body.position!=null)
    {
        name.position=req.body.position;
    }
    if(req.body.salary!=null)
    {
        name.salary=req.body.salary;
    }
    if(req.body.count_kids!=null)
    {
        name.count_kids=req.body.count_kids;
    }
    if(req.body.experience!=null)
    {
        name.experience=req.body.experience;
    }
    res.send(data);
});
export default apiRouter;
