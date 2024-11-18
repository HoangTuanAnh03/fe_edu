import z from "zod";

export const CreateBody = z
  .object({
    name: z.string({ required_error: "Required information" }).trim().max(256),
    image: z
      // .instanceof()
      .string()
      .trim()
      // .optional(),

    // .min(0, {
    //   message: "Required information"
    // })
    
  })
  .strict();

export type CreateBodyType = z.TypeOf<typeof CreateBody>;
