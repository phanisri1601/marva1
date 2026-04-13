'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export function ProductShowcase() {
  const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();
  const router = useRouter();

  const handleProductClick = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  const products = [
    {
      id: 301,
      name: 'PEANUT BUTTER',
      price: '₹165',
      image: '/penaut butter-3.jpeg',
      hoverImage: '/penaut butter-3.jpeg',
    },
    {
      id: 101,
      name: 'Power Bite',
      price: '₹49',
      image: '/proteinbar1.png',
      hoverImage: '/proteinbar1.png',
    },
    {
      id: 201,
      name: 'BISCUITS',
      price: '₹49',
      image: '/biscuits-1.jpeg',
      hoverImage: '/biscuits-1.jpeg',
    },
    {
      id: 103,
      name: 'Protein Bar - Chocolate',
      price: '₹79',
      image: '/bg_marvaproteinbar.png',
      hoverImage: '/bg_marvaproteinbar.png',
    },
    {
      id: 104,
      name: 'Protein Bar - Peanut Crunch',
      price: '₹79',
      image: '/chatgpt.png',
      hoverImage: '/chatgpt.png',
    },
    {
      id: 102,
      name: 'Katora',
      price: '₹49',
      image: '/katora.jpeg',
      hoverImage: '/katora.jpeg',
    },
  ];

  const getProductQuantity = (productId: number) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (productId: number, productName: string, productPrice: string) => {
    const currentQuantity = getProductQuantity(productId);
    if (currentQuantity === 0) {
      addToCart(productId, productName, productPrice);
    } else {
      updateQuantity(productId, currentQuantity + 1);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Product Showcase
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our best sellers, featuring top-rated products loved by customers
            for their quality, performance, and unbeatable value.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => {
            const quantity = getProductQuantity(product.id);
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden relative cursor-pointer flex flex-col h-full"
                onClick={() => handleProductClick(product.id)}
              >
                {/* Product Image with Zoom Effect */}
                <div className="relative h-64 sm:h-64 flex items-center justify-center p-4 flex-shrink-0 overflow-hidden mx-auto w-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-110 mx-auto"
                  />
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col flex-grow">
                  {/* Product Name */}
                  <h3 className="text-lg font-bold text-gray-800 mb-3 leading-tight min-h-[2.5rem]">
                    {product.name}
                  </h3>
                  
                  {/* Price and Buy Now Row */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-gray-900">
                      {product.price}
                    </span>
                    
                    {/* Buy Now Button - Compact, next to price */}
                    {quantity === 0 && (
                      <button 
                        className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors duration-200 whitespace-nowrap shadow-sm"
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(product.id, product.name, product.price); }}
                      >
                        Buy Now
                      </button>
                    )}
                  </div>
                  
                  <div className="flex-grow"></div>

                  {/* Quantity Controls */}
                  {quantity > 0 && (
                    <div className="flex items-center justify-between bg-emerald-50 rounded-xl p-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); updateQuantity(product.id, quantity - 1); }}
                        className="p-2 bg-white rounded-lg hover:bg-emerald-100 transition-colors duration-200 shadow-sm"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4 text-emerald-600" />
                      </button>
                      <span className="text-base font-semibold text-gray-800 min-w-[3rem] text-center">
                        {quantity} in cart
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); updateQuantity(product.id, quantity + 1); }}
                        className="p-2 bg-white rounded-lg hover:bg-emerald-100 transition-colors duration-200 shadow-sm"
                      >
                        <Plus className="w-4 h-4 text-emerald-600" />
                      </button>
                    </div>
                  )}

                  {/* Added Badge */}
                  {quantity > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                    >
                      {quantity} in cart
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
