// https://www.mongodb.com/community/forums/t/mongodb-localhost-connection/15307
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const isProduction = process.env.NODE_ENV === 'production';
        
        const mongoUri = isProduction
            ? process.env.MONGO_URI_PRODUCTION
            : process.env.MONGO_URI_LOCAL;
            
            if (!mongoUri) {
                throw new Error('DATABASE_URL is undefined.')
            }
        // const dbURI = process.env.DATABASE_URL

        const conn = await mongoose.connect(mongoUri)
        console.log(`Connected to MongoDB successfully: ${conn.connection.host}.`)
    } catch (error) {
        console.error("Error connecting to the database: ", error)
    }
}
// DB configuration changed
export default connectDB

// const conSuccess = mongoose.connection
// conSuccess.once('open', _ => {
//   console.log('Database connected:', db)
// })