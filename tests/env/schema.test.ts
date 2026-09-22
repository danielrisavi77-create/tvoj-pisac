import { parseServerEnv } from "@/env/schema";

describe("server environment contract", () => {
  it("requires a valid app URL in production", () => {
    expect(() => parseServerEnv({}, "production")).toThrow(
      /NEXT_PUBLIC_APP_URL/,
    );
  });

  it("accepts the local app URL in development", () => {
    expect(
      parseServerEnv(
        { NEXT_PUBLIC_APP_URL: "http://localhost:3000" },
        "development",
      ),
    ).toEqual({ NEXT_PUBLIC_APP_URL: "http://localhost:3000" });
  });

  it("does not echo supplied values in validation errors", () => {
    const suppliedValue = "not-a-url-with-sensitive-looking-value";
    let error: unknown;

    try {
      parseServerEnv(
        { NEXT_PUBLIC_APP_URL: suppliedValue },
        "production",
      );
    } catch (caughtError) {
      error = caughtError;
    }

    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toContain("NEXT_PUBLIC_APP_URL");
    expect((error as Error).message).not.toContain(suppliedValue);
  });
});
