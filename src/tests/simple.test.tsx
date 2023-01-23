import { appRouter } from "../server/trpc/router/_app";
import { describe, expect, test } from "vitest";
import { createContextInner } from "../server/trpc/context";
import { mockDeep } from "vitest-mock-extended";
import { PrismaClient } from "@prisma/client";

const mockResponse = {
  createdAt: new Date("2023-01-22T23:13:24.594Z"),
  id: "f8224ace-8832-49d3-87d9-1c77a53177f2",
  name: "Jhon Doe",
  updatedAt: new Date("2023-01-22T23:13:24.594Z"),
};

describe("tRPC Api routes", () => {
  test("should add new user properly", async () => {
    const prismaMock = mockDeep<PrismaClient>();
    const caller = appRouter.createCaller({ prisma: prismaMock });
    prismaMock.users.create.mockResolvedValue(mockResponse);
    const example = await caller.users.addNewUser(mockResponse);
    expect(example).toMatchObject({
      name: "Jhon Doe",
    });
  });

  test("should return all users created", async () => {
    const prismaMock = mockDeep<PrismaClient>();
    prismaMock.users.findMany.mockResolvedValue([mockResponse]);
    const caller = appRouter.createCaller({ prisma: prismaMock });
    const result = await caller.users.getAll();
    expect(result).toMatchObject([mockResponse]);
    expect(result).toHaveLength(1);
  });

  test("should delete one user properly", async () => {
    const prismaMock = mockDeep<PrismaClient>();
    const caller = appRouter.createCaller({ prisma: prismaMock });
    prismaMock.users.delete.mockResolvedValue(mockResponse);
    const responseDelete = await caller.users.removeUser({
      id: mockResponse.id,
    });
    expect(responseDelete).toMatchObject({
      name: "Jhon Doe",
    });
  });

  test("should Throw an Error an error if type short user name", async () => {
    const ctx = await createContextInner({});
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.users.getUsersByName({ name: "t" })
    ).rejects.toThrowError();
  });

  test("should return user and run test properly", async () => {
    const prismaMock = mockDeep<PrismaClient>();
    const caller = appRouter.createCaller({ prisma: prismaMock });
    prismaMock.users.findMany.mockResolvedValue([mockResponse]);
    const foundUser = await caller.users.getUsersByName({
      name: "Jhon Doe",
    });
    expect(foundUser).toHaveLength(1);
    expect(foundUser).toMatchObject([{ name: "Jhon Doe" }]);
  });
});
