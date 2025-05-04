import app from './api/index.js'
import connectDB from './api/db/dbConfig.js'  
import { config } from 'dotenv'
config()

const PORT = process.env.PORT || 3000

console.log('Starting server...')

try {
  console.log('Connecting to database...')
  await connectDB()
  console.log('Database connected successfully')
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
} catch (error) {
  console.error('Error starting server:', error)
  process.exit(1)
}