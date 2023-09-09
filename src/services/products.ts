import products from "./products.db.json";

export async function fetchFavoriteProducts() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return products.map((product) => {
    const primaryImage = product.images.find((image) => image.primary === true);
    if (primaryImage === undefined) {
      throw new Error("A product must have one primary image.");
    }

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      imageSrc: primaryImage.imageSrc,
      imageAlt: primaryImage.imageAlt,
    };
  });
}

export async function fetchProductData({ productId }: { productId: number }) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const product = products.find((product) => product.id === productId);
  if (product === undefined) {
    return undefined;
  }

  return product;
}
