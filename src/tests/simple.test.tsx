import { appRouter, type AppRouter } from "../server/trpc/router/_app";
import { describe, expect, test } from "vitest";
import { createContextInner } from "../server/trpc/context";
import { mockDeep } from "vitest-mock-extended";
import { PrismaClient } from "@prisma/client";

describe("Trpc Api routes", () => {
  test("should add new user properly", async () => {
    const ctx = await createContextInner({});
    const caller = appRouter.createCaller(ctx);
    const example = await caller.users.addNewUser({ name: "Rivail Santos" });
    expect(example).toMatchObject({
      name: "Rivail Santos",
    });
  });

  test.only("should return all users created", async () => {
    const prismaMock = mockDeep<PrismaClient>();
    const mockResponse = {
      createdAt: new Date("2023-01-22T23:13:24.594Z"),
      id: "f8224ace-8832-49d3-87d9-1c77a53177f2",
      name: "Rivail Santos",
      updatedAt: new Date("2023-01-22T23:13:24.594Z"),
    };
    prismaMock.users.findMany.mockResolvedValue([mockResponse]);
    const caller = appRouter.createCaller({ prisma: prismaMock });
    const result = await caller.users.getAll();
    expect(result).toMatchObject([mockResponse]);
    expect(result).toHaveLength(1);
  });
});
