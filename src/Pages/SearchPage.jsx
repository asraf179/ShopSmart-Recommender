import { ProductCard } from "../components/ProductCard";

const SearchPage = ({ products }) => {
  if (products.length === 0) {
    return <p className="text-gray-500">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product, index) => (
         <ProductCard key={`cb-${index}`} product={product} />
      ))}
    </div>
  );
};

export default SearchPage;
