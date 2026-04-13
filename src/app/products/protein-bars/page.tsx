'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Star, ShoppingCart, Heart, Check } from 'lucide-react';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

const proteinBars = [
  {
    id: 101,
    name: 'POWER BITZ',
    price: 49,
    rating: 4.8,
    reviews: 124,
    protein: '18g',
    calories: 220,
    description: 'Nutritious energy bites packed with seeds and natural sweetness for a healthy snack.',
    ingredients: 'Sunflower seeds, Pumpkin seeds, Watermelon seeds, Flax seeds, Peanut butter, Dates, Honey, Cardamom powder, Oats',
    features: ['Seed Power', 'Natural Sweetness', 'High Energy', 'No Preservatives', '₹49'],
    badge: 'Bestseller',
    image: '/proteinbar1.png'
  },
  {
    id: 102,
    name: 'Katora',
    price: 49,
    rating: 4.7,
    reviews: 89,
    protein: '16g',
    calories: 190,
    description: 'Traditional style protein bar with wholesome ingredients and authentic flavors.',
    ingredients: 'Whey Protein, Oats, Honey, Dates, Mixed Nuts, Cardamom',
    features: ['Traditional Recipe', 'High Fiber', 'Natural Energy', 'Healthy Snack', '₹49'],
    badge: 'New',
    image: '/katora.jpeg'
  },
  {
    id: 103,
    name: 'Protein Bar - Chocolate',
    price: 79,
    rating: 4.8,
    reviews: 145,
    protein: '20g',
    calories: 210,
    description: 'Rich chocolate protein bar with premium cocoa for chocolate lovers.',
    ingredients: 'Whey Protein, Cocoa Powder, Dark Chocolate, Honey, Almonds, Sea Salt',
    features: ['Rich Chocolate', 'High Protein', 'Premium Cocoa', 'Energy Boost', '₹79'],
    badge: 'Popular',
    image: '/bg_marvaproteinbar.png'
  },
  {
    id: 104,
    name: 'Protein Bar - Peanut Crunch',
    price: 79,
    rating: 4.9,
    reviews: 167,
    protein: '21g',
    calories: 230,
    description: 'Crunchy peanut protein bar with real peanut pieces for extra texture.',
    ingredients: 'Whey Protein, Peanuts, Peanut Butter, Honey, Crunchy Rice, Sea Salt',
    features: ['Peanut Crunch', 'Extra Protein', 'Crunchy Texture', 'High Energy', '₹79'],
    badge: 'Premium',
    image: '/chatgpt.png'
  },
  {
    id: 105,
    name: 'POWER BITZ – DARK & NUTS',
    price: 79,
    rating: 4.9,
    reviews: 156,
    protein: '15g',
    calories: 250,
    description: 'Premium energy bites with dark chocolate and premium nuts for a luxurious treat.',
    ingredients: 'Almonds, Walnuts, Cashews, Pistachios, Dark chocolate, Dates',
    features: ['Dark Chocolate', 'Premium Nuts', 'Rich Taste', 'Healthy Fats', '₹79'],
    badge: 'Premium',
    image: '/powerbitz-dark-ai.png'
  }
];

export default function ProteinBarsPage() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProteinBarsPageContent />
      </CartProvider>
    </AuthProvider>
  );
}

function ProteinBarsPageContent() {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = (productId: number, productName: string, productPrice: number) => {
    addToCart(productId, productName, `₹${productPrice}`);
  };

  const handleProductClick = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-green-50 to-amber-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                  Premium <span className="text-green-600">Protein Bars</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  High-quality protein bars crafted with premium ingredients to fuel your active lifestyle and support your fitness goals.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
              >
                {[
                  { number: '20g', label: 'Protein per bar' },
                  { number: '0', label: 'Artificial flavors' },
                  { number: '4.7★', label: 'Average rating' },
                  { number: '5', label: 'Delicious flavors' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-xl p-6 text-center shadow-lg"
                  >
                    <div className="text-3xl font-bold text-green-600 mb-2">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {proteinBars.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/2">
                        <div className="h-64 bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center p-4">
                          <img
                            src={product.image || '/bg_marvaproteinbar.png'}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      </div>
                      
                      <div className="md:w-1/2 p-8">
                        {product.badge && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                              product.badge === 'Bestseller' ? 'bg-red-500 text-white' :
                              product.badge === 'New' ? 'bg-green-500 text-white' :
                              'bg-purple-500 text-white'
                            }`}
                          >
                            {product.badge}
                          </motion.div>
                        )}
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h3>
                        
                        <div className="flex items-center mb-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">
                            {product.rating} ({product.reviews} reviews)
                          </span>
                        </div>

                        <p className="text-gray-600 mb-4">{product.description}</p>
                        
                        <div className="flex gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{product.protein}</div>
                            <div className="text-xs text-gray-500">Protein</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-amber-600">{product.calories}</div>
                            <div className="text-xs text-gray-500">Calories</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {product.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full flex items-center"
                            >
                              <Check className="w-3 h-3 mr-1" />
                              {feature}
                            </span>
                          ))}
                        </div>

                        <div className="text-sm text-gray-500 mb-6">
                          <strong>Ingredients:</strong> {product.ingredients}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                          
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 bg-green-100 rounded-full"
                            >
                              <Heart className="w-5 h-5 text-green-600" />
                            </motion.button>
                            <Button variant="primary" size="sm" onClick={(e) => { e?.stopPropagation(); handleAddToCart(product.id, product.name, product.price); }}>
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <Footer />
        </div>
  );
}
