import { connect } from 'mongoose';

const dbConnection = async () => {
    try {
        await connect(process.env.MONGO_CNN);
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

export default dbConnection;
