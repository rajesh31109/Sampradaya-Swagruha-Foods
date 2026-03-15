import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StorefrontLayout from '@/components/StorefrontLayout';

export default function OrderConfirmationPage() {
  const orderId = `ORD${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <StorefrontLayout>
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="h-10 w-10 text-primary" strokeWidth={1.5} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-3">Order Successfully Placed!</h1>
          <p className="text-muted-foreground mb-6">Thank you for your order. We're preparing your homemade goodness with care.</p>

          <div className="bg-card rounded-2xl shadow-card p-6 mb-8 text-left">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Order ID</p>
                <p className="font-bold text-foreground">{orderId}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Estimated Delivery</p>
                <p className="font-bold text-foreground">3-5 Business Days</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <p className="font-bold text-primary">Order Placed</p>
              </div>
              <div>
                <p className="text-muted-foreground">Payment</p>
                <p className="font-bold text-foreground">Confirmed</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" asChild>
              <Link to="/order-tracking"><Package className="mr-2 h-4 w-4" /> Track Order</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </StorefrontLayout>
  );
}
