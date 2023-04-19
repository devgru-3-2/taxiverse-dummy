const ethCrypto=require('eth-crypto');
const fs=require("fs");
const HDwalletprovider=require("@truffle/hdwallet-provider");
const Web3=require("web3");
const session=require("express-session");
const CurrentRide=require("../models/Auction");
const abi=require("../user_contract").abi2;
const address=require("../user_contract").address2;

const axios = require('axios');
const geocodingAPIKey = process.env.MAPS_API_KEY;


const calculateFare = require('../models/fareCalculator').calculateFare;


module.exports=(app)=>{
    app.get("/homer",async (req,res)=>{
        
        if(req.session.username!==undefined){
            if(req.session.userType==="Rider")
            {
                const dbRecord=await CurrentRide.findOne({username:req.session.username});
                if(dbRecord===null){
                    res.render("homer");
                }
                else{
                    res.redirect("/currentbids");
                }
            }
            else{
                res.render("homed");
            }
        }else{
            res.redirect("/");
        }
        

    }); 

    app.post("/homer",async (req,res)=>{
        console.log(req.body);
        if(req.session.username)
        {
       
        const from=req.body.from;
        const to=req.body.to;
        const dist = String(req.body.dist);
        const time = String(req.body.dura);


        const currentRide=new CurrentRide({
            
            from:from,
            to:to,
            dist:dist,
            dura:time,
            username:req.session.username,
            status:"AVL",
            bids:[]
        });
        await currentRide.save()
        .then(() => {
                console.log("Current ride saved successfully.");
            })
        .catch((err) => {
        console.error(err);
        });

        req.session.On=true;
        res.redirect("/currentbids");
    }

});

       /* const geocodingAPIUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(to)}&key=${geocodingAPIKey}`;
        const response = await axios.get(geocodingAPIUrl);
        const localityType = response.data.results[0].address_components.find(component => component.types.includes('locality')).long_name;
        
        console.log(localityType);

        const fareRange = calculateFare(dist, localityType);

        console.log(fareRange);


        const currentRide=new CurrentRide({
            username:req.session.username,
            from:from,
            to:to,
            dist:dist,
            dura:time,
            range: fareRange,
            status:"AVL",
            bids:[]
        });
        await currentRide.save()
        .then(() => {
                console.log("Current ride saved successfully.");
            })
        .catch((err) => {
        console.error(err);
        });*/


  
        
    

    app.get("/currentbids",async (req,res)=>{
        if(req.session.username){
            const dbRecord=await CurrentRide.findOne({username:req.session.username});
            console.log(dbRecord);
            
            if(dbRecord.status==="BOK" || dbRecord.status==="MET"){
                res.redirect("/finalr");
            }else{
            let message=null;
            const bids=dbRecord.bids;
            if(bids.length===0){
                // console.log(bids);
                message="No bids yet";
            }
            res.render("bid",{to:dbRecord.to,from:dbRecord.from,range:dbRecord.range,bid:bids,message:message});
            }
        }else{
            res.redirect("/");
        }
    });

    app.post("/currentbids",async (req,res)=>{
        if(req.session.username){
            const bidder=req.body.bidder;
            const value=req.body.value;
            const resp=await CurrentRide.findOneAndUpdate({username:req.session.username},{finalBidder:bidder,finalValue:value,status:"BOK",$set:{bids:[]}});
            console.log(resp);
            
            res.redirect("/finalr");
        }
    });

    app.get("/finalr",async(req,res)=>{
        if(req.session.username!==undefined){
        const getBidder=await CurrentRide.find({username:req.session.username});
        const provider=new HDwalletprovider(
            "0610fa82d89b7230824eeecb75156aa975608dd0c4525f4a635ccb710601df9f",
            'https://goerli.infura.io/v3/121dd66cc4b74939942a0fbf12c2ad8e'
         );
        const web3=new Web3(provider);
    
        console.log("provider set");
    
        const contract=new web3.eth.Contract(abi,address);
        console.log(getBidder[0]);
        const response=await contract.methods.get(getBidder[0].finalBidder).call();
        
        const final={
            name:response['5'],
            phoneNumber:response['1'],
            value:getBidder[0].finalValue,
            vehicle:response['2'],
            vehicleNo:response['3']

        }
        const status=getBidder[0].status;
        if(status==="MET"){
            res.render("finalr",{final:final,message:"done"});    
        }else{
        res.render("finalr",{final:final,message:null});
        }}else{
            res.redirect("/");
        }

    });
    app.post("/finalr",async(req,res)=>{
        const currentUser= await CurrentRide.findOneAndUpdate({username:req.session.username},{status:"MET"});
        const getBidder=await CurrentRide.find({username:req.session.username});
        const provider=new HDwalletprovider(
            "0610fa82d89b7230824eeecb75156aa975608dd0c4525f4a635ccb710601df9f",
            'https://goerli.infura.io/v3/121dd66cc4b74939942a0fbf12c2ad8e'
         );
        const web3=new Web3(provider);
    
        console.log("provider set");
    
        const contract=new web3.eth.Contract(abi,address);
        // console.log(;
        const response=await contract.methods.get(getBidder[0].finalBidder).call();
        
        const final={
            name:response['5'],
            phoneNumber:response['1'],
            value:getBidder[0].finalValue,
            vehicle:response['2'],
            vehicleNo:response['3']

        }


        res.render("finalr",{final:final,message:"done"})

    });
 
}