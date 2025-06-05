import { fastify } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { cors } from './main/config/cors';
import { swagger } from './main/config/swagger';
import { zodValidator } from './main/config/zod-validator';
import { routes } from './main/config/routes';

const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>()

cors(app)
swagger(app)
zodValidator(app)

app.register(routes)

const start = async () => {
  try {
    await app.listen({ port: 3000 })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()