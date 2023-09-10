import { z } from "zod";

export const CartCookieContent = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    price: z.string(),
    quantity: z.number(),
    imageSrc: z.string().url(),
    imageAlt: z.string(),
  })
);
export type CartCookieContent = z.infer<typeof CartCookieContent>;

export const AddProductRequestBody = z.object({
  productId: z.number(),
});
export type AddProductRequestBody = z.infer<typeof AddProductRequestBody>;

export const AddProductResponseBody = z.object({
  cart: CartCookieContent,
});
export type AddProductResponseBody = z.infer<typeof AddProductResponseBody>;
