import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTodos = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("todos").collect();
  },
});

export const createTodo = mutation({
  args: {
    value: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("todos", {
      value: args.value,
      done: false,
    });
  },
});

export const deleteTodo = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

export const updateTodo = mutation({
  args: {
    id: v.id("todos"),
    value: v.string(),
    done: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, { value: args.value });
  },
});

export const toggleTodo = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    return await ctx.db.patch(args.id, { done: !todo.done });
  },
});
