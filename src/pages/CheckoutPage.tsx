import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import StorefrontLayout from '@/components/StorefrontLayout';
import { useCart } from '@/contexts/CartContext';

export default function CheckoutPage() {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'online'>('online');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    navigate('/order-confirmation');
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <StorefrontLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif font-bold text-foreground mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl shadow-card p-6"
              >
                <h2 className="font-serif font-semibold text-lg text-card-foreground mb-4">Delivery Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" required placeholder="Enter your full name" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" required placeholder="+91 98765 43210" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required placeholder="you@example.com" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required placeholder="Street address" />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required placeholder="City" />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" required placeholder="State" />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input id="pincode" required placeholder="500001" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl shadow-card p-6"
              >
                <h2 className="font-serif font-semibold text-lg text-card-foreground mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-default transition-all duration-200 border-primary bg-primary/5`}>
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={true}
                      readOnly
                      className="accent-primary"
                    />
                    <div>
                      <p className="font-semibold text-sm text-foreground">Online Payment</p>
                      <p className="text-xs text-muted-foreground">UPI, Cards, Net Banking</p>
                    </div>
                  </label>
                </div>
              </motion.div>
            </div>

            <div className="bg-card rounded-2xl shadow-card p-6 h-fit sticky top-24">
              <h3 className="font-serif font-semibold text-lg text-card-foreground mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={`${item.product.id}-${item.selectedWeight || 'default'}`} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.product.name} × {item.quantity}</span>
                    <span className="font-semibold tabular-nums">₹{(item.unitPrice ?? item.product.price) * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="tabular-nums">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="tabular-nums">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary text-lg tabular-nums">₹{total}</span>
                </div>
              </div>
              <Button variant="hero" className="w-full mt-6" size="lg" type="submit">
                Place Order
              </Button>
            </div>
          </div>
        </form>
      </div>
    </StorefrontLayout>
  );
}
