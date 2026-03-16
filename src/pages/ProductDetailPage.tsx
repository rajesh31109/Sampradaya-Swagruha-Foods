import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StorefrontLayout from '@/components/StorefrontLayout';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/mockData';
// cart and toast removed for simplified product view

import productPickle from '@/assets/product-pickle.jpg';
import productSweet from '@/assets/product-sweet.jpg';
import productSnack from '@/assets/product-snack.jpg';
import productSpice from '@/assets/product-spice.jpg';

const categoryImages: Record<string, string> = {
  'Pickles': productPickle,
  'Sweets': productSweet,
  'Snacks': productSnack,
  'Spices': productSpice,
  'Traditional Specials': productSweet,
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  // purchase controls removed; product view is simplified

  if (!product) {
    return (
      <StorefrontLayout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-serif">Product not found</h1>
          <Button asChild className="mt-4"><Link to="/products">Back to Products</Link></Button>
        </div>
      </StorefrontLayout>
    );
  }

  const image = product.image && product.image !== '/placeholder.svg' ? product.image : (categoryImages[product.category] || productPickle);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  // Add-to-cart removed per requirements

  return (
    <StorefrontLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="aspect-square rounded-3xl overflow-hidden shadow-card"
          >
            <img src={image} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <span className="text-sm text-accent font-semibold uppercase tracking-wider mb-2">{product.category}</span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-3">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-muted'}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            <p className="text-3xl font-bold text-primary tabular-nums mb-6">₹{product.price}</p>

            <p className="text-muted-foreground text-pretty leading-relaxed mb-6">{product.description}</p>

            {/* Weight and Status display removed per request */}

            <div className="mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">Ingredients</p>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map(ing => (
                  <span key={ing} className="text-xs bg-primary/5 text-primary px-3 py-1 rounded-full">{ing}</span>
                ))}
              </div>
            </div>

            {/* Purchase controls removed: quantity selector, weight options and add-to-cart */}
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </StorefrontLayout>
  );
}
