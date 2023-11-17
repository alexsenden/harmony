import dotenv from 'dotenv'

import { createExpressApp } from './app'

dotenv.config()

// Create express app
const app = createExpressApp()

// Expose Server
const port = process.env.PORT || 8082
app.listen(port, () => {
  console.log(`🚀[server]: Server is running at http://localhost:${port}`)
})
