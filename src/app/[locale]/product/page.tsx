import ProductList from "@/components/features/shop/ProductList";
import getProductsApi from "@/components/services/productService";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

async function Products() {
  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: ["products"],
    queryFn: getProductsApi,
  });

  if (!data) {
    notFound();
  }

  return (
    <section className="py-16 px-[5%]">
      <div className="container mx-auto">
        <div className="container mx-auto py-15">
          <h1 className="text-3xl font-bold mb-10 md:text-4xl tracking-tight">
            Products
          </h1>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductList />
          </HydrationBoundary>
        </div>
      </div>
    </section>
  );
}

export default Products;
