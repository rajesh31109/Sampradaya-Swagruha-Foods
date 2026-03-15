import { products as allProducts, orders as allOrders } from '@/data/mockData';
import { Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function AdminSoldProducts() {
  // Build aggregation: productId -> weightLabel -> qty
  const agg: Record<string, Record<string, number>> = {};

  allOrders.forEach(o => {
    o.items.forEach(it => {
      const pid = it.product.id;
      const weight = (it as any).selectedWeight || it.product.weight || 'default';
      const qty = it.quantity || 0;
      if (!agg[pid]) agg[pid] = {};
      agg[pid][weight] = (agg[pid][weight] || 0) + qty;
    });
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-serif font-bold text-foreground">Sold Products</h2>
        <Link to="/admin/orders" className="text-sm text-muted-foreground hover:text-foreground">← Back to Orders</Link>
      </div>

      <div className="bg-card rounded-2xl shadow-card overflow-hidden p-6">
        <div className="grid gap-4">
          {allProducts.map((p, i) => {
            const byWeight = agg[p.id] || {};
            const hasAny = Object.keys(byWeight).length > 0;
            return (
              <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="flex items-center justify-between p-3 rounded-md bg-background">
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-muted-foreground">{p.category}</div>
                </div>
                <div className="flex items-center gap-2">
                  {hasAny ? (
                    Object.entries(byWeight).map(([w, q]) => (
                      <Badge key={w} className="bg-muted text-muted-foreground">{w} — {q}</Badge>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground">No sales</div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
