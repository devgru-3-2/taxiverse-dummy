const ethCrypto=require('eth-crypto');
const fs=require("fs");
const HDwalletprovider=require("@truffle/hdwallet-provider");
const Web3=require("web3");
const session=require("express-session");
var mongoose=require('mongoose');

const abi=require("../user_contract").abi2;
const address=require("../user_contract").address2;

const cookie=require("cookie-parser");

//const abi=require("../family_tree_details").abi;
//const address=require("../family_tree_details").address;
//const byteCode=require("../family_tree_details").bytecode;
const createIdentity=require("./create_identity");
const Profiles = require('../models/Profiles');

require("dotenv").config();

module.exports=(app)=>{

    app.get("/signupr",(req,res)=>{
        if(req.session.username!== undefined){
            res.redirect("/homer");
        }
        else{
        res.render("signupr",{message:null});
        }
    });
    /*app.get("/login", (req,res) => {
        res.redirect("login");

    });*/

    app.post("/signupr",async (req,res)=>{
        const name=req.body.name;
        const phno=req.body.phno;
        const username=req.body.email;
        const password=req.body.password;
        const userType = 'Rider';
        const vehicle="";
        const vehicleNo="";
        // Creating identity
        var identity=createIdentity();
        console.log(identity);
        const publicKey=identity.publicKey;
        const privateKey=identity.privateKey;
        const newCompressed=ethCrypto.publicKey.compress(
            publicKey
        );
        identity.compressed=newCompressed;

        const provider=new HDwalletprovider(
            "840e1fcf5b316c485b3785a360f601991ac08d8fcfc9f02fb314443419d3eb03",
            'https://goerli.infura.io/v3/584ddee4afe84ca1bf3a5ba437a77dbc'
         );
 
        const web=new Web3(provider);
 
        console.log("provider set");
 
        const contract=new web.eth.Contract(abi,address);
        const response= await contract.methods.set(name,username,phno,vehicle,vehicleNo,userType,password,privateKey).send({
             from:"0xBfeb97f0225DCA79065906a11cBC59c15821EBF3"   
        });



        req.session.username=username;
        req.session.privateKey=privateKey;
        req.session.userType=userType;

        res.redirect("/homer");
});

    

}