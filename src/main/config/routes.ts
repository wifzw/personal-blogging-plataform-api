import { FastifyInstanceTypedZod } from "../../types/fastify-instance-typed-zod";

import { articlesRoute } from "../../modules/articles/routes/articles-routes";
import { usersRoute } from "../../modules/users/routes/users-route";

export async function routes(app: FastifyInstanceTypedZod) {
  usersRoute(app);
  articlesRoute(app);
}
