import mongoose from "mongoose";

const mongoConnection = async () => {

    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('Connected to MongoDB Atlas');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB Atlas:', err.message);
        });

}

export default mongoConnection;