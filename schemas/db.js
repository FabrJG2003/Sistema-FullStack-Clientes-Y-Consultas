import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/estudio_contable");
        console.log(">>>DB is Connected.")
    } catch (error) {
        console.log(error);
    }
};