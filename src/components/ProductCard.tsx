// no local state needed for simplified card
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';

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

export default function ProductCard({ product, onBuy }: { product: Product, onBuy?: (product: Product, selectedWeight: string, multiplier: number) => void }) {
  const navigate = useNavigate();
  const image = product.image && product.image !== '/placeholder.svg' ? product.image : (categoryImages[product.category] || productPickle);
  // Default multiplier for 1kg weight (keeps price consistent with 1kg)
  const multiplier = 2;


  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="group bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden"
    >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.rating >= 4.8 && (
            <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
              Best Seller
            </span>
          )}
        </div>

        <div className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.category}</p>
          <h3 className="font-serif font-semibold text-lg leading-tight mb-1 text-card-foreground">{product.name}</h3>
          {/* shelf life and quantity controls removed per request */}
          <div className="flex items-center justify-between">
            <span className="text-primary font-bold tabular-nums text-lg">₹{Math.round(product.price * multiplier)}</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              <span className="tabular-nums">{product.rating}</span>
            </div>
          </div>

          <div className="mt-4">
            <Button
              variant="secondary"
              onClick={(e) => { e.stopPropagation(); navigate(`/products/${product.id}`); }}
              className="w-full"
            >
              Product Details
            </Button>
          </div>
        </div>
      </motion.div>
  );
}
