import type { APIRoute, APIContext, AstroCookies } from "astro";
import {
  AddProductRequestBody,
  AddProductResponseBody,
  CartCookieContent,
} from "../../types";
import { fetchProductData } from "../../services/products";

export function getCartCookie(cookies: AstroCookies) {
  const cookie = cookies.get("cart")?.json();
  if (cookie === undefined) {
    return undefined;
  }

  return CartCookieContent.parse(cookie);
}

function setCartCookie(context: APIContext, content: CartCookieContent) {
  context.cookies.set("cart", JSON.stringify(content), { path: '/' });
}

export const POST: APIRoute = async (context) => {
  const jsonBody = await context.request.json();
  const body = AddProductRequestBody.parse(jsonBody);

  const currentCart = getCartCookie(context.cookies) ?? [];

  const addedProduct = await fetchProductData({ productId: body.productId });
  if (addedProduct === undefined) {
    throw new Error("Tried to add to cart an unknown product");
  }

  const productQuantityAlreadyInCart = currentCart.find(
    (product) => product.id === addedProduct.id
  );
  if (productQuantityAlreadyInCart !== undefined) {
    productQuantityAlreadyInCart.quantity++;
  } else {
    currentCart.push({
      id: addedProduct.id,
      name: addedProduct.name,
      price: addedProduct.price,
      quantity: 1,
      imageSrc: addedProduct.images[0].imageSrc,
      imageAlt: addedProduct.images[0].imageAlt,
    });
  }

  const responseBody: AddProductResponseBody = {
    cart: currentCart,
  };

  setCartCookie(context, currentCart);

  return new Response(JSON.stringify(responseBody));
};
