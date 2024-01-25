import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { showRoutes } from 'hono/dev'
import { Bindings } from './bindings';
import { drizzle } from "drizzle-orm/d1";
import { comments, insertCommentsSchema } from "./schema";
import { zValidator } from '@hono/zod-validator'
const app = new Hono<{ Bindings: Bindings }>()

// ロガーを追加
app.use('*', logger());

app.use(
  '*',
  cors({
    origin: ['https://cloudflare-stream-test.pages.dev', 'http://localhost:4321'], // 本番と開発環境のURL
		allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests', 'Content-Type'], // ここに追加
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    maxAge: 600,
    credentials: true,
  })
)


app.get('/api/hello', async (c) => {
	const now = new Date()
	const result = {message: now};
	return c.json(result);
})

app.get('/api/comments', async (c) => {
	const db = drizzle(c.env.DB);
	const result = await db.select().from(comments).all();
	return c.json(result);
})

app.post('/api/comments', zValidator('json', insertCommentsSchema.omit({ createdAt: true, updatedAt: true})), async (c) => {
	const { text } = c.req.valid('json');
	const db = drizzle(c.env.DB);
	const result = await db.insert(comments).values({
			text,
			createdAt: new Date(),
			updatedAt: new Date()
	}).execute();
	return c.json(result);
});

export default app
showRoutes(app)