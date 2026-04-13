'use client';

import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Star, Heart, ArrowLeft, ShoppingCart, Check, Flame, Scale } from 'lucide-react';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';

// Combined product data from all categories
const allProducts = {
  'protein-bars': [
    {
      id: 101,
      name: 'POWER BITZ',
      price: 49,
      rating: 4.8,
      reviews: 124,
      protein: '18g',
      calories: 220,
      description: 'Nutritious energy bites packed with seeds and natural sweetness for a healthy snack.',
      ingredients: ['Sunflower seeds', 'Pumpkin seeds', 'Watermelon seeds', 'Flax seeds', 'Peanut butter', 'Dates', 'Honey', 'Cardamom powder', 'Oats'],
      features: ['Seed Power', 'Natural Sweetness', 'High Energy', 'No Preservatives', '18g Protein', '₹49'],
      badge: 'Bestseller',
      image: '/proteinbar1.png',
      category: 'Protein Bars'
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
      ingredients: ['Whey Protein', 'Oats', 'Honey', 'Dates', 'Mixed Nuts', 'Cardamom'],
      features: ['Traditional Recipe', 'High Fiber', 'Natural Energy', 'Healthy Snack', '16g Protein', '₹49'],
      badge: 'New',
      image: '/katora.jpeg',
      category: 'Protein Bars'
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
      ingredients: ['Whey Protein', 'Cocoa Powder', 'Dark Chocolate', 'Honey', 'Almonds', 'Sea Salt'],
      features: ['Rich Chocolate', 'High Protein', 'Premium Cocoa', 'Energy Boost', '20g Protein', '₹79'],
      badge: 'Popular',
      image: '/chatgpt.png',
      category: 'Protein Bars'
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
      ingredients: ['Whey Protein', 'Peanuts', 'Peanut Butter', 'Honey', 'Crunchy Rice', 'Sea Salt'],
      features: ['Peanut Crunch', 'Extra Protein', 'Crunchy Texture', 'High Energy', '21g Protein', '₹79'],
      badge: 'Premium',
      image: '/pachagewithbar.png',
      category: 'Protein Bars'
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
      ingredients: ['Almonds', 'Walnuts', 'Cashews', 'Pistachios', 'Dark chocolate', 'Dates'],
      features: ['Dark Chocolate', 'Premium Nuts', 'Rich Taste', 'Healthy Fats', '15g Protein', '₹79'],
      badge: 'Premium',
      image: '/powerbitz-dark-ai.png',
      category: 'Protein Bars'
    }
  ],
  'biscuits': [
    {
      id: 201,
      name: 'ATTA BISCUITS',
      price: 49,
      rating: 4.7,
      reviews: 98,
      calories: 140,
      description: 'Traditional whole wheat biscuits made with pure ghee and jaggery for authentic taste.',
      ingredients: ['Whole grain atta', 'Ghee', 'Jaggery', 'Almonds'],
      features: ['Whole Wheat', 'Pure Ghee', 'Natural Jaggery', 'Traditional Recipe', '140 Calories', '₹49'],
      badge: 'Bestseller',
      image: '/biscuits-1.jpeg',
      category: 'Biscuits'
    }
  ],
  'spreads': [
    {
      id: 301,
      name: 'PEANUT BUTTER',
      price: 165,
      rating: 4.9,
      reviews: 203,
      protein: '26g',
      calories: 580,
      description: 'Pure roasted peanuts ground to perfection with olive oil for a smooth, creamy spread. Net Weight: 300g',
      ingredients: ['Peanut butter', 'Rosted peanuts', 'Olive oil'],
      features: ['100% Natural', '26g Protein', '300g Net Weight', 'Smooth Texture', 'No Additives', '₹165'],
      badge: 'Bestseller',
      image: '/penautbutter.png',
      category: 'Spreads'
    }
  ]
};

export default function ProductDetailPage() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductDetailContent />
      </CartProvider>
    </AuthProvider>
  );
}

function ProductDetailContent() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const productId = params.id as string;
  
  // Find the product across all categories
  let product: any = null;
  let category: string = '';
  
  for (const [cat, products] of Object.entries(allProducts)) {
    const found = products.find(p => p.id === parseInt(productId) || p.id.toString() === productId);
    if (found) {
      product = found;
      category = cat;
      break;
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Button variant="primary" onClick={() => router.push('/products')}>
            Back to Products
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const priceDisplay = `₹${product.price}`;

  const handleAddToCart = () => {
    addToCart(product.id, product.name, priceDisplay);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-50 to-amber-50 shadow-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-8"
                />
                {product.badge && (
                  <div className="absolute top-6 left-6 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {product.badge}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Category */}
              <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wide">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xl font-bold text-gray-900">{product.rating}</span>
                </div>
                <span className="text-gray-500">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="text-4xl font-bold text-emerald-600">
                {priceDisplay}
              </div>

              {/* Description */}
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Nutrition Info */}
              <div className="flex space-x-6 py-4 border-y border-gray-200">
                {product.protein && (
                  <div className="flex items-center space-x-2">
                    <Scale className="w-5 h-5 text-emerald-600" />
                    <span className="text-gray-700"><strong>{product.protein}</strong> Protein</span>
                  </div>
                )}
                {product.calories && (
                  <div className="flex items-center space-x-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-700"><strong>{product.calories}</strong> Calories</span>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3">
                {product.features.map((feature: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Add to Cart Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Heart className="w-6 h-6 text-gray-600" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Ingredients Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Ingredients</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {product.ingredients.map((ingredient: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-emerald-50 rounded-xl p-4 text-center"
                  >
                    <span className="text-emerald-800 font-medium">{ingredient}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-amber-800 text-sm">
                  <strong>Note:</strong> All our products are made with natural ingredients. No artificial preservatives, colors, or flavors. Made fresh daily.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">100% Natural</h3>
              <p className="text-gray-600 text-sm">Made with all-natural ingredients, no artificial additives</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Healthy Choice</h3>
              <p className="text-gray-600 text-sm">Nutritious and delicious, perfect for your active lifestyle</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">Crafted with care using the finest ingredients</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
