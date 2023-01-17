import { router } from "../trpc";
import { usersRouter } from "./users";

export const appRouter = router({
  users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
