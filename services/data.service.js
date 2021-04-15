const db=require('./db');

let accountDetails = {

    1000: { acno: 1000, name: "Akhil", balance: 5000, password: "user1" },
    1002: { acno: 1002, name: "Rajan", balance: 3000, password: "user2" },
    1003: { acno: 1003, name: "Amaya", balance: 4000, password: "user3" },
    1004: { acno: 1004, name: "Anaya", balance: 3500, password: "user4" },
    1005: { acno: 1005, name: "Nayana", balance: 2000, password:"user5" }
}

 let currentUser; 

const register = (acno, name, password) => {
    //console.log("register called");

    return db.User.findOne({
        acno}).then(user=>{//call back function
        console.log(user)
        if(user){
            return {
                status: false,
                statusCode: 422,
                message: "user already exist.plz login"
            }
        }
            else{
                const newUser = new db.User({
                acno,
                name,
                balace:0,
                password
        
                  });
                  newUser.save();
                  return{
                    status:true,
                    statusCode:200,
                    message:"Registration successful",

                    name:user.name
            
                  }
            }
        
        })
}

//     if (acno in accountDetails) {
//         //alert("User already exist. Please Login")
//         return {
//             status: false,
//             statusCode: 422,
//             message: "user already exist.plz login"
//         }
//     }
//     else {
//         accountDetails[acno] = {
//             acno,
//             name,
//             balance: 0,
//             password
//         }
//     }
//         //this.saveDetails();
//         //alert("Registration successful")
//         console.log(this.accountDetails);
//         return {
//             status: true,
//             statusCode: 200,
//             message: "registration successful"
//         }
//  }


const checkLogin = (req, acno, password) => {
    var acno = parseInt(acno);
   return db.User.findOne({
      acno,
      password:password

    }).then(user=>{
      console.log(user)
      if(user){
        req.session.currentUser = user.acno
        console.log( req.session.currentUser)
      
        return{
            status:true,
            statusCode:200,
            message:"login Succesful",
            name:user.name
            
        } 
      }
      return{
        status:false,
        statusCode:422,
        message:"invalid credentials"
      }
})
}

    // let dataset= accountDetails;
    // if(acno in dataset){
    //     var password1= dataset[acno].password
    //   if(password1 ==password){
    //    req.session.currentUser = dataset[acno].name
    //     return{
    //         status:true,
    //         statusCode:200,
    //         message:"login Succesful"
            
    //     } 
    //   }
    //   else{
    //     return{
    //         status:false,
    //         statusCode:422,
    //         message:"incorrect password"
            
    //     } 
    //   }
    // }
    // else{
    //     return{
    //         status:false,
    //         statusCode:422,
    //         message:"No user exist with provided Account Number"
            
    //     } 
    // }
  
//     if (acno in accountDetails) {
//         if (password == accountDetails[acno].password) {
//             currentUser = accountDetails[acno].name;
//             //this.saveDetails();
//             return {
//                 status: true,
//                 statusCode: 200,
//                 message: "login successful"
//             }
//         }
//         else {
//             return {
//                 status: false,
//                 statusCode: 422,
//                 message: "incorrect password"
//             }
//         }
//     }
//     else {
//         return {
//             status: false,
//             statusCode: 422,
//             message: "no user exist with this account number"
//         }
//     }
// }

const userDeposit = (acno, password, amount) => {
    var amount = parseInt(amount);
    return db.User.findOne({
      acno,
      password:password
    }).then(user=>{
       // console.log(user)
      if(!user){
        return{
          status:false,
          statusCode:422,
          message:"No user exist with provided Account Number",
          
                }

      }
      user.balance+=amount;
      user.save();
      return{
        status:true,
        statusCode:200,
        message:"Account has been credited",
        balance:user.balance
        
              } 
    })
    
}
//     if(!req.session.currentUser){
//         return {
//             status: false,
//             statusCode: 410,
//             message: "please login",
            
//         }
//     }
//     var amount = parseInt(amount);
//     let dataset=accountDetails;
//     if (acno in dataset) {
//         var password1=dataset[acno].password;
//         if (password1 == password) {
//             // let existingAmount = accountDetails[acno].balance;
//             // let newAmount = parseInt(existingAmount) + parseInt(amount);
//             dataset[acno].balance += amount;

//             //this.saveDetails();
//             //console.log(accountDetails);

//             return {
//                 status: true,
//                 statusCode: 200,
//                 message: "account credited with amount",
//                 balance: dataset[acno].balance
//             }
//         }
//         else {
//             return {
//                 status: false,
//                 statusCode: 422,
//                 message: "incorrect password",

//             }
//         }
//     }
//     else {
//         return {
//             status: false,
//             statusCode: 422,
//             message: "no user exist with this account number",


//         }
//     }
// }

  const  userWithdraw=(acno,password,amount)=>{
    var amount = parseInt(amount);
    return db.User.findOne({
        acno,
        password:password
      }).then(user=>{
        //console.log(user)
        if(!user){
          return{
            status:false,
            statusCode:422,
            message:"No user exist with provided Account Number",
            
                  }
  

        }
        if(req.session.currentUser !=acno){
          return{
            status:false,
            statusCode:422,
            message:"permission denied",
           
            
            }
        }

        if(user.balance<amount){
          return{
            status:false,
            statusCode:422,
            message:"insufficient balance",
           
            
            }
        }
        user.balance-=amount;
        user.save();
        return{
          status:true,
          statusCode:200,
          message:"Account has been debited",
          balance:user.balance
          
                } 
      })
    // let dataset=accountDetails;
    // if (acno in dataset) {
    //     var password1=dataset[acno].password

    //     if (password1 == password) {
    //         if(dataset[acno].balance>amount)
    //         // let existingAmount = accountDetails[acno].balance;
    //         // let newAmount = parseInt(existingAmount) - parseInt(amount);
    //         dataset[acno].balance -= amount;

    
    //     //his.saveDetails();
    //     //console.log(accountDetails);

    //     return{
    //         status: true,
    //         statusCode:200,
    //             message: "account debited with amount ",
    //             balance:dataset[acno].balance
    //     }
    //   }
    //   else{
    //     return{
    //         status: false,
    //         statusCode:422,
    //             message: "incorrect password",

    //     }
    //   }
    // }
    // else{
    //     return{
    //         status: false,
    //         statusCode:422,
    //             message: "no user exist with this account number",
    //     }         
    // }
  }

module.exports = {
    register,
    checkLogin,
    userDeposit,
    userWithdraw
}