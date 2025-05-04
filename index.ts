import app from './api/index'
import connectDB from './api/db/dbConfig'
import { config } from 'dotenv'
config()

const PORT = process.env.PORT || 3000

connectDB()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})