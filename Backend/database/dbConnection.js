import mongoose from 'mongoose';

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"Naukri_mernStack"
    }).then(()=>{
        console.log(`Successfully Connected to database`);
    }).catch((err)=>{
        console.log(`some error occured : ${err}`);
    })
}

export default dbConnection;