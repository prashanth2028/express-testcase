import mongoose from "mongoose";


 const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.DB_URL
        );
        console.log('db connect..');
        
    } catch (error) {        
        console.error(error.message);
        process.exit(1);
        
    }
};

export default connectDB;