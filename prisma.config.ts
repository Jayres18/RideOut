import { defineConfig } from 'prisma/config'
import { config } from 'dotenv'
import path from 'path'

config({ path: path.resolve(process.cwd(), '.env.local') })

export default defineConfig({
  datasource: {
    url: process.env.DIRECT_URL,
  },
})
