import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { clsx } from "clsx";
import { QueryClientProvider, useMutation } from "@tanstack/react-query";
import { queryClient } from "../shared/queryClient";
import { AddProductResponseBody, type AddProductRequestBody } from "../types";
import { cartService } from "../shared/cart";

interface ProductPageCustomizationProps {
  productId: number;
  colors: { name: string; bgColor: string; selectedColor: string }[];
  sizes: { name: string; inStock: boolean }[];
}

function ProductPageCustomizationBase({
  productId,
  colors,
  sizes,
}: ProductPageCustomizationProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);

  const checkoutProductMutation = useMutation({
    mutationFn: async (request: AddProductRequestBody) => {
      const res = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify(request),
      });

      return AddProductResponseBody.parse(await res.json());
    },
    onSuccess: ({ cart }) => {
      console.log("cart", cart);

      cartService.send({
        type: "Product added to cart",
        cart,
      });
    },
    onError: console.error,
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        checkoutProductMutation.mutate({ productId });
      }}
    >
      {/* Color picker */}
      <div>
        <h2 className="text-sm font-medium text-gray-900">Color</h2>

        <RadioGroup
          value={selectedColor}
          onChange={setSelectedColor}
          className="mt-2"
        >
          <RadioGroup.Label className="sr-only">
            Choose a color
          </RadioGroup.Label>
          <div className="flex items-center space-x-3">
            {colors.map((color) => (
              <RadioGroup.Option
                key={color.name}
                value={color}
                className={({ active, checked }) =>
                  clsx(
                    color.selectedColor,
                    active && checked ? "ring ring-offset-1" : "",
                    !active && checked ? "ring-2" : "",
                    "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                  )
                }
              >
                <RadioGroup.Label as="span" className="sr-only">
                  {color.name}
                </RadioGroup.Label>
                <span
                  aria-hidden="true"
                  className={clsx(
                    color.bgColor,
                    "h-8 w-8 rounded-full border border-black border-opacity-10"
                  )}
                />
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Size picker */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900">Size</h2>
          <a
            href="#"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            See sizing chart
          </a>
        </div>

        <RadioGroup
          value={selectedSize}
          onChange={setSelectedSize}
          className="mt-2"
        >
          <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {sizes.map((size) => (
              <RadioGroup.Option
                key={size.name}
                value={size}
                className={({ active, checked }) =>
                  clsx(
                    size.inStock
                      ? "cursor-pointer focus:outline-none"
                      : "cursor-not-allowed opacity-25",
                    active ? "ring-2 ring-indigo-500 ring-offset-2" : "",
                    checked
                      ? "border-transparent bg-indigo-600 text-white hover:bg-indigo-700"
                      : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
                    "flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1"
                  )
                }
                disabled={!size.inStock}
              >
                <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>

      <button
        type="submit"
        className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add to cart
      </button>
    </form>
  );
}

export function ProductPageCustomization(props: ProductPageCustomizationProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductPageCustomizationBase {...props} />
    </QueryClientProvider>
  );
}
