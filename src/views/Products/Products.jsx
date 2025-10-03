const products = [
  {
    name: "Cougar DarkBlader-G Case",
    image: "https://example.com/product1.jpg",
    description: "ARGB Full Tower Case with bold design.",
    price: 169.99,
    discount: 15
  },
   {
    name: "Smart Watch",
    image: "https://example.com/product1.jpg",
    description: "ARGB Full Tower Case with bold design.",
    price: 169.99,
    discount: 15
  },
   {
    name: "",
    image: "https://example.com/product1.jpg",
    description: "ARGB Full Tower Case with bold design.",
    price: 169.99,
    discount: 15
  },
   {
    name: "Cougar DarkBlader-G Case",
    image: "https://example.com/product1.jpg",
    description: "ARGB Full Tower Case with bold design.",
    price: 169.99,
    discount: 15
  },
   {
    name: "Cougar DarkBlader-G Case",
    image: "https://example.com/product1.jpg",
    description: "ARGB Full Tower Case with bold design.",
    price: 169.99,
    discount: 15
  },
   {
    name: "Cougar DarkBlader-G Case",
    image: "https://example.com/product1.jpg",
    description: "ARGB Full Tower Case with bold design.",
    price: 169.99,
    discount: 15
   }
 
];

export default function Products() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-700">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 px-4">
        {products.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </div>
  );
}