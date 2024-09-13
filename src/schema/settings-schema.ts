import { z } from "zod";


export const CommonDataSourceSchema = z.object({
  name: z.string().min(1),
  prefix: z
    .string()
    .min(1)
    .regex(
      /^$|^[A-Z][A-Za-z0-9_]*$/,
      "Must start with an uppercase letter and only consist of alphanumeric characters and underscores"
    ),
});

export type CommonDataSourceSchema = z.infer<typeof CommonDataSourceSchema>;

export function makeConnectSettings(zod: typeof z) {
  return z.object({
    accessToken: zod.string(),
    clientId: zod.string(),
    clientSecret: zod.string(),
    orgId: zod.string(),
    shortCode: zod.string(),
    siteId: zod.string()
  });
}

export const ConnectSettings = makeConnectSettings(z);
export type ConnectSettings = z.infer<typeof ConnectSettings>;