import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

function ProductList() {
  const products = [
    {
      id: "1",
      name: "One Piece Tome 1",
      price: 7.2,
      stock: 5000,
    },
    {
      id: "2",
      name: "One Piece Tome 2",
      price: 7.2,
      stock: 5000,
    },
  ];
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
