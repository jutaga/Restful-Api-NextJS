import { ProductCard } from "@/products";
import { products } from "@/products/data/products";

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-1">
        {
            products.map((product) => (
                <ProductCard key={product.id} {...product} />
            ))
    }
    </div>
  );
}