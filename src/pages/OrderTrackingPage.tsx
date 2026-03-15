import { motion } from 'framer-motion';
import { Package, CheckCircle, Truck, MapPin, Home, ClipboardCheck } from 'lucide-react';
import StorefrontLayout from '@/components/StorefrontLayout';

const steps = [
  { label: 'Order Placed', icon: ClipboardCheck, done: true },
  { label: 'Confirmed', icon: CheckCircle, done: true },
  { label: 'Packed', icon: Package, done: true },
  { label: 'Shipped', icon: Truck, done: false },
  { label: 'Out for Delivery', icon: MapPin, done: false },
  { label: 'Delivered', icon: Home, done: false },
];

export default function OrderTrackingPage() {
  const currentStep = steps.filter(s => s.done).length - 1;

  return (
    <StorefrontLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Track Your Order</h1>
        <p className="text-muted-foreground mb-10">Order ID: <span className="font-semibold text-foreground">ORD1001</span></p>

        <div className="relative">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 mb-8 last:mb-0"
            >
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  i <= currentStep
                    ? 'bg-primary text-primary-foreground'
                    : i === currentStep + 1
                    ? 'border-2 border-primary text-primary bg-background'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <step.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-0.5 h-12 ${i <= currentStep ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </div>
              <div className="pt-2">
                <p className={`font-semibold text-sm ${i <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.label}
                </p>
                {i <= currentStep && (
                  <p className="text-xs text-accent mt-0.5">Completed</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </StorefrontLayout>
  );
}
