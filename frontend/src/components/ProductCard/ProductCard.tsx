import "./ProductCard.css";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <h2>{product.name}</h2>
      <p>{product.price}</p>
      <p>Stock: {product.stock}</p>
    </article>
  );
}

export default ProductCard;
