import app from './api/index.js'
import connectDB from './api/db/dbConfig.js'
import { config } from 'dotenv'
config()

const PORT = process.env.PORT || 3000

connectDB()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})