
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../component/Header";
import { RiShoppingCart2Line } from "react-icons/ri";
import { addToCart, setProducts } from "../redux/action";

const AccessoriesPage = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const filteredCategories = ["jewelery", "electronics"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        dispatch(setProducts(data));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const filteredClothingProducts = allProducts.filter((product) =>
    filteredCategories.some((category) => product.category.toLowerCase().includes(category))
  );

  const renderProductCard = (product) => (
    <div key={product.id} className="product-card shadow-lg p-4 bg-white rounded-md text-center">
      <img
        src={product.image}
        alt={product.title}
        className="w-[10vw] h-[35vh] object-cover mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
      <p className="text-green-600 mb-2">₹{product.price.toFixed(2)}</p>
      <p className="text-gray-700 mb-4">{product.description.substring(0, 50)}</p>
      <div className="flex justify-between items-center">
        <button
          onClick={() => dispatch(addToCart(product.id, 1))}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add to Cart
        </button>
        <div className="flex items-center space-x-2">
          <RiShoppingCart2Line size={20} />
          <span>{cart[product.id] || 0}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="clothing-page container mx-auto py-8">
      <Header />
      <div className="my-8 text-center">
        <h1 className="text-4xl font-bold text-yellow-500">
          Accessories for Men/Women
        </h1>
        <p className="mt-2 text-lg text-white">
          Discover a wide range of high-quality products
        </p>
      </div>
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredClothingProducts.map((product) => renderProductCard(product))}
      </div>
    </div>
  );
};

export default AccessoriesPage;
