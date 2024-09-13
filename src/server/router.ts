import { TRPCError } from "@trpc/server";
import { procedure, router } from "./trpc";
import {
  CommonDataSourceSchema,
  ConnectSettings
} from "../schema/settings-schema";
import { z } from "@netlify/sdk";

export const appRouter = router({
  connectSettings: {
    upsert: procedure
      .input(
        z.object({
          dataLayerId: z.string(),
          configurationId: z.string().optional(),
          config: ConnectSettings,
        }).merge(CommonDataSourceSchema)
      )
      .mutation(
        async ({
          ctx: { teamId, client: c },
          input: { dataLayerId, configurationId, config },
        }) => {
          console.log(dataLayerId, configurationId);
          console.log(config);
        }
      ),
  },
});

export type AppRouter = typeof appRouter;