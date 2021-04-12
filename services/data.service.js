let accountDetails = {

    1000: { acno: 1000, name: "Akhil", balance: 5000, password: "user1" },
    1002: { acno: 1002, name: "Rajan", balance: 3000, password: "user2" },
    1003: { acno: 1003, name: "Amaya", balance: 4000, password: "user3" },
    1004: { acno: 1004, name: "Anaya", balance: 3500, password: "user4" },
    1005: { acno: 1005, name: "Nayana", balance: 2000, password:"user5" }
}

let currentUser; 

const register = (acno, name, password) => {
    console.log("register called");

    if (acno in accountDetails) {
        //alert("User already exist. Please Login")
        return {
            status: false,
            statusCode: 422,
            message: "user already exist.plz login"
        }
    }
    else {
        accountDetails[acno] = {
            acno,
            name,
            balance: 0,
            password
        }
    }
        //this.saveDetails();
        //alert("Registration successful")
        console.log(this.accountDetails);
        return {
            status: true,
            statusCode: 200,
            message: "registration successful"
        }
 }


const checkLogin = (req, acno, password) => {
    let dataset= accountDetails;
    if(acno in dataset){
        var password1= dataset[acno].password
      if(password1 ==password){
       req.session.currentUser = dataset[acno].name
        return{
            status:true,
            statusCode:200,
            message:"login Succesful"
            
        } 
      }
      else{
        return{
            status:false,
            statusCode:422,
            message:"incorrect password"
            
        } 
      }
    }
    else{
        return{
            status:false,
            statusCode:422,
            message:"No user exist with provided Account Number"
            
        } 
    }
  }
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
    if(!req.session.currentUser){
        return {
            status: false,
            statusCode: 410,
            message: "please login",
           
        }
    }
    var amnt = parseInt(amount);
    let dataset=accountDetails;
    if (acno in dataset) {
        var password1=dataset[acno].password;
        if (password1 == password) {
            // let existingAmount = accountDetails[acno].balance;
            // let newAmount = parseInt(existingAmount) + parseInt(amount);
            dataset[acno].balance += amnt;

            //this.saveDetails();
            //console.log(accountDetails);

            return {
                status: true,
                statusCode: 200,
                message: "account credited with amount",
                balance: dataset[acno].balance
            }
        }
        else {
            return {
                status: false,
                statusCode: 422,
                message: "incorrect password",

            }
        }
    }
    else {
        return {
            status: false,
            statusCode: 422,
            message: "no user exist with this account number",


        }
    }
}

  const  userWithdraw=(acno,password,amount)=>{
    var amnt = parseInt(amount);
    let dataset=accountDetails;
    if (acno in dataset) {
        var password1=dataset[acno].password

        if (password1 == password) {
            if(dataset[acno].balance>amount)
            // let existingAmount = accountDetails[acno].balance;
            // let newAmount = parseInt(existingAmount) - parseInt(amount);
            dataset[acno].balance -= amnt;

    
        //his.saveDetails();
        //console.log(accountDetails);

        return{
            status: true,
            statusCode:200,
                message: "account debited with amount ",
                balance:dataset[acno].balance
        }
      }
      else{
        return{
            status: false,
            statusCode:422,
                message: "incorrect password",

        }
      }
    }
    else{
        return{
            status: false,
            statusCode:422,
                message: "no user exist with this account number",
        }         
    }
  }

module.exports = {
    register,
    checkLogin,
    userDeposit,
    userWithdraw
}