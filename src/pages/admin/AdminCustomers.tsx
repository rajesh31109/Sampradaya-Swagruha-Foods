import { customers } from '@/data/mockData';
import { motion } from 'framer-motion';

export default function AdminCustomers() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-serif font-bold text-foreground">Customers</h2>

      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Name</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Email</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Phone</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Orders</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c, i) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border last:border-0 hover:bg-primary/5 transition-colors"
                >
                  <td className="px-5 py-3 font-semibold">{c.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{c.email}</td>
                  <td className="px-5 py-3 tabular-nums text-muted-foreground">{c.phone}</td>
                  <td className="px-5 py-3 tabular-nums">{c.ordersCount}</td>
                  <td className="px-5 py-3 tabular-nums font-semibold">₹{c.totalSpending.toLocaleString()}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
