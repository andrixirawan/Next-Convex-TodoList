import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  todos: defineTable({
    value: v.string(),
    done: v.boolean(),
  }),
});

export default schema;
