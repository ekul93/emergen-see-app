import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addPatient = mutation({
  args: {
    name: v.string(),
    age: v.string(),
  },
  handler: async (ctx, { name, age }) => {
    return await ctx.db.insert("patients", { name, age });
  },
});
