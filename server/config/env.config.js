import 'dotenv/config'
import zod from 'zod'

const envSchema = zod.object({
  NODE_PORT: zod.coerce.number(),
  NODE_ENVIRONMENT: zod.string(),
  DB_HOST: zod.string(),
  DB_USER: zod.string(),
  DB_PASSWORD: zod.string(),
  DB_SCHEMA: zod.string(),
  MONGODB_URl: zod.string(),
  SESSION_SECRET: zod.string(),
  SESSION_COOKIE_NAME: zod.string(),
})

const validatedEnv = envSchema.safeParse(process.env)

if (!validatedEnv.success) {
  throw new Error(JSON.stringify(validatedEnv.error.flatten().fieldErrors))
}

export const CONFIG = {
  NODE_PORT: validatedEnv.data.NODE_PORT,
  NODE_ENVIRONMENT: validatedEnv.data.NODE_ENVIRONMENT,
  DB_HOST: validatedEnv.data.DB_HOST,
  DB_USER: validatedEnv.data.DB_USER,
  DB_PASSWORD: validatedEnv.data.DB_PASSWORD,
  DB_SCHEMA: validatedEnv.data.DB_SCHEMA,
  MONGODB_URl: validatedEnv.data.MONGODB_URl,
  SESSION_SECRET: validatedEnv.data.SESSION_SECRET,
  SESSION_COOKIE_NAME: validatedEnv.data.SESSION_COOKIE_NAME,
}