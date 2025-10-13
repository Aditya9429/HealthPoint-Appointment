import mongoose  from "mongoose";

async function connectDb(){
    try{
       await mongoose.connect(process.env.MONGOOSE_URL);
       console.log("Connected to Database successfully");
    }
    catch(e){
        console.log(e);
        process.exit(1);
    }
}

export default connectDb
