import { motion } from 'framer-motion';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

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

export default function AdminOfflineCart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, subtotal, shipping, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" strokeWidth={1} />
        <h1 className="text-2xl font-serif font-bold text-foreground mb-2">Cart is empty</h1>
        <p className="text-muted-foreground mb-6">Use Offline Buying to add items to the cart.</p>
        <Button variant="hero" onClick={() => navigate('/admin/offline')}>Browse Products</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link to="/admin/offline" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Offline Buying
        </Link>
      </div>

      <h1 className="text-3xl font-serif font-bold text-foreground mb-8">Offline Billing</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={`${item.product.id}-${item.selectedWeight || 'default'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl shadow-card p-4 flex gap-4"
            >
              <div className="block w-24 h-24 rounded-xl overflow-hidden shrink-0">
                <img
                  src={item.product.image || categoryImages[item.product.category] || productPickle}
                  alt={item.product.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-serif font-semibold text-card-foreground">{item.product.name}</h3>
                <p className="text-sm text-muted-foreground">{item.selectedWeight || item.product.weight} · {item.quantity === 1 ? 'Single' : `${item.quantity} pcs`}</p>
                <div className="mt-1">
                  <p className="text-sm text-muted-foreground">Price: <span className="text-primary font-bold tabular-nums">₹{item.unitPrice ?? item.product.price}</span> each</p>
                  <p className="text-primary font-bold tabular-nums">Total: ₹{(item.unitPrice ?? item.product.price) * item.quantity}</p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product.id, item.selectedWeight)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="mt-2 text-sm text-muted-foreground bg-muted rounded-lg px-3 py-2">
                  <span className="font-semibold tabular-nums">{item.quantity} {item.quantity === 1 ? 'unit' : 'pcs'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-card rounded-2xl shadow-card p-6 h-fit sticky top-24">
          <h3 className="font-serif font-semibold text-lg text-card-foreground mb-4">Order Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold tabular-nums">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-semibold tabular-nums">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            {shipping === 0 && <p className="text-xs text-accent">🎉 Free shipping on orders above ₹500</p>}
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-primary text-lg tabular-nums">₹{total}</span>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Button variant="hero" className="w-full" size="lg" onClick={() => window.print()}>
              Print
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => { clearCart(); navigate('/admin/offline'); }}>
              Finish & Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
