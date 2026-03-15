import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StorefrontLayout from '@/components/StorefrontLayout';
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

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal, shipping, total } = useCart();

  if (items.length === 0) {
    return (
      <StorefrontLayout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" strokeWidth={1} />
          <h1 className="text-2xl font-serif font-bold text-foreground mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
          <Button variant="hero" asChild><Link to="/products">Browse Products</Link></Button>
        </div>
      </StorefrontLayout>
    );
  }

  return (
    <StorefrontLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Continue Shopping
        </Link>

        <h1 className="text-3xl font-serif font-bold text-foreground mb-8">Shopping Cart</h1>

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
                <Link to={`/products/${item.product.id}`} className="block w-24 h-24 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={item.product.image || categoryImages[item.product.category] || productPickle}
                    alt={item.product.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                </Link>
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
            <Button variant="hero" className="w-full mt-6" size="lg" asChild>
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </StorefrontLayout>
  );
}
