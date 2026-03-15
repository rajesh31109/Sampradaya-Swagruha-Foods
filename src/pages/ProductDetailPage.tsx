import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import StorefrontLayout from '@/components/StorefrontLayout';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/mockData';
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

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const weightOptions = [
    { label: '250g', multiplier: 0.5 },
    { label: '500g', multiplier: 1 },
    { label: '750g', multiplier: 1.5 },
    { label: '1kg', multiplier: 2 },
  ];
  const defaultOption = weightOptions.find(o => o.label === product.weight) || weightOptions[3];
  const [selectedWeight, setSelectedWeight] = useState(defaultOption.label);
  const [multiplier, setMultiplier] = useState(defaultOption.multiplier);

  const handleWeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const opt = weightOptions.find(o => o.label === e.target.value)!;
    setSelectedWeight(opt.label);
    setMultiplier(opt.multiplier);
  };

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

  const handleAddToCart = () => {
    const unitPrice = Math.round(product.price * multiplier);
    addToCart(product, qty, selectedWeight, multiplier, unitPrice);
    toast.success(`${product.name} added to cart`);
  };

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

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <p className="text-xs text-muted-foreground">Weight</p>
                <p className="font-semibold text-sm text-foreground">{product.weight}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <p className="text-xs text-muted-foreground">Shelf Life</p>
                <p className="font-semibold text-sm text-foreground">{product.shelfLife}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3 text-center">
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="font-semibold text-sm text-foreground">In Stock</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">Ingredients</p>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map(ing => (
                  <span key={ing} className="text-xs bg-primary/5 text-primary px-3 py-1 rounded-full">{ing}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-3 bg-muted rounded-lg px-2">
                <Button variant="ghost" size="icon" onClick={() => setQty(Math.max(1, qty - 1))} className="h-10 w-10">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-semibold tabular-nums">{qty}</span>
                <Button variant="ghost" size="icon" onClick={() => setQty(qty + 1)} className="h-10 w-10">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
                <div className="flex items-center gap-3">
                  {weightOptions.map(o => {
                    const active = selectedWeight === o.label;
                    return (
                      <button
                        key={o.label}
                        onClick={() => { const opt = weightOptions.find(x => x.label === o.label)!; setSelectedWeight(opt.label); setMultiplier(opt.multiplier); }}
                        className={`px-3 py-2 rounded-md text-sm ${active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10'}`}
                      >
                        {o.label}
                      </button>
                    );
                  })}
                </div>
              <Button variant="hero" size="lg" onClick={handleAddToCart} className="flex-1">
                <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
              </Button>
            </div>
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
