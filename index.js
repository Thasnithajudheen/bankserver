const express= require('express');
const session =require('express-session');
const cors = require('cors')
const dataService= require('./services/data.service');



const app = express();
app.use(cors({
  origin:'http://localhost:4200',
  credentials:true
}))


app.use(session({
    secret:'randomsecurestring',
    resave:false,
    saveUninitialized:false
}))
// app.use((req,res,next)=>{
//     //console.log("middleware");
//     console.log(req.body);
//     next()
// })
const logMiddleware = (req,res,next)=>{
    console.log(req.body);
    next()
  }
  
  
  //app.use(logMiddleware);
  
  const authMiddleware=(req,res,next)=>{
    console.log(req.session.currentUser);
    if(!req.session.currentUser){
  
      return res.json({//return in json format
        status:false,
        statusCode:422,
        message:"please Log in",
        
        
    })
  
    }
    else{
      next()
    }
  
  }
  
  
  //
  app.use(express.json());


app.get('/',(req,res)=>{
    res.status(401).send("GET METHOD UPDATED")
})

app.post('/',(req,res)=>{
    res.send("POST METHOD")
})
app.post('/register',(req,res)=>{
    //console.log(req.body);
    //const result = 
    dataService.register(req.body.acno,req.body.name, req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result);
      })
   //console.log(res.status(result.statusCode).json(result));
    //console.log(res.send(result.message));
    //     res.status(result.statusCode);
    //    console.log(res.json(result));
   // console.log(res.status(result).statusCode);
//   
//res.status(200),send("success");
})
app.post('/checkLogin',(req,res)=>{
    // console.log(req.body);
    //const result = 
    dataService.checkLogin(req,req.body.acno, req.body.password)
  
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
   
    //console.log(res.status(result.statusCode).json(result));
    //console.log(res.send(result.message));
//     res.status(result.statusCode);
//     console.log(res.json(result));
 })
 app.post('/userDeposit',authMiddleware,(req,res)=>{
    console.log(req.session.currentUser);//check
    // console.log(req.body);
   // const result = 
   dataService.userDeposit(req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result);
      })
      
    //console.log(res.status(result.statusCode).json(result));
    //console.log(res.send(result.message));
    //     res.status(result.statusCode);
    //     console.log(res.json(result));
 })
 app.post('/userWithdraw',authMiddleware,(req,res)=>{
   // console.log(req.body);
   // const result = 
   dataService.userWithdraw(req.body.acno,req.body.password,req.body.amount)
   .then(result=>{
    res.status(result.statusCode).json(result);
  })
  
   // console.log(res.status(result.statusCode).json(result));
    //console.log(res.send(result.message));
//     res.status(result.statusCode);
//     console.log(res.json(result));
 })


app.put('/',(req,res)=>{
    res.send("PUT METHOD")
})

app.patch('/',(req,res)=>{
    res.send("PATCH METHOD")
})
app.delete('/',(req,res)=>{
    res.send("DELETE METHOD")
})


app.listen(3003,()=>{
console.log("server started at port 3003")
})

