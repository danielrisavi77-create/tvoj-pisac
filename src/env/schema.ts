import { z } from "zod";

const serverEnvironmentSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

export type ServerEnvironment = z.infer<typeof serverEnvironmentSchema>;
export type EnvironmentMode = "development" | "production";

export function parseServerEnv(
  source: Record<string, unknown>,
  mode: EnvironmentMode,
): ServerEnvironment {
  const result = serverEnvironmentSchema.safeParse({
    NEXT_PUBLIC_APP_URL: source.NEXT_PUBLIC_APP_URL,
  });

  if (!result.success) {
    throw new Error(
      `Invalid ${mode} environment variable: NEXT_PUBLIC_APP_URL must be a valid URL`,
    );
  }

  return result.data;
}
