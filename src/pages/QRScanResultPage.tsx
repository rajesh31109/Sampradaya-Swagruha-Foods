import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, CheckCircle } from 'lucide-react';
import StorefrontLayout from '@/components/StorefrontLayout';

export default function QRScanResultPage() {
  const [searchParams] = useSearchParams();
  const product = searchParams.get('product') || 'Mango Pickle';
  const batchId = searchParams.get('batchId') || 'BATCH0326';
  const manufactured = searchParams.get('manufactured') || '2026-03-01';
  const expiry = searchParams.get('expiry') || '2026-09-01';

  return (
    <StorefrontLayout>
      <div className="max-w-md mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl shadow-card p-8 text-center border-2 border-accent/30"
        >
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-accent" strokeWidth={1.5} />
          </div>

          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <CheckCircle className="h-4 w-4" /> Verified Authentic
          </div>

          <h1 className="text-2xl font-serif font-bold text-card-foreground mb-6">{product}</h1>

          <div className="space-y-4 text-left">
            {[
              { label: 'Batch ID', value: batchId },
              { label: 'Manufactured', value: manufactured },
              { label: 'Expiry Date', value: expiry },
              { label: 'Status', value: '🟢 Freshly Prepared', highlight: true },
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className={`text-sm font-semibold ${item.highlight ? 'text-accent' : 'text-foreground'} tabular-nums`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            This product was verified by Sampradaya Swagruha Foods. Made with 100% natural ingredients.
          </p>
        </motion.div>
      </div>
    </StorefrontLayout>
  );
}
