import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

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

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const image = product.image && product.image !== '/placeholder.svg' ? product.image : (categoryImages[product.category] || productPickle);

  const weightOptions = [
    { label: '250g', multiplier: 0.5 },
    { label: '500g', multiplier: 1 },
    { label: '750g', multiplier: 1.5 },
    { label: '1kg', multiplier: 2 },
  ];
  const defaultOption = weightOptions.find(o => o.label === '1kg') || weightOptions[1];
  const [selectedWeight, setSelectedWeight] = useState(defaultOption.label);
  const [multiplier, setMultiplier] = useState(defaultOption.multiplier);

  const handleWeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const opt = weightOptions.find(o => o.label === e.target.value)!;
    setSelectedWeight(opt.label);
    setMultiplier(opt.multiplier);
  };


  return (
    <Link to={`/products/${product.id}`}>
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
          <p className="text-sm text-muted-foreground mb-3">{product.shelfLife} shelf life</p>
          <div className="mb-3">
            <label className="text-xs text-muted-foreground block mb-2">Quantity</label>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {weightOptions.map(o => {
                  const active = selectedWeight === o.label;
                  return (
                    <button
                      key={o.label}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedWeight(o.label); setMultiplier(o.multiplier); }}
                      className={`px-3 py-2 rounded-md text-sm ${active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10'}`}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-primary font-bold tabular-nums text-lg">₹{Math.round(product.price * multiplier)}</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              <span className="tabular-nums">{product.rating}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
