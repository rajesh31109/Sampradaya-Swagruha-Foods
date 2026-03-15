import { motion } from 'framer-motion';
import { ShoppingBag, DollarSign, Package, AlertTriangle, TrendingUp } from 'lucide-react';
import { orders, products, customers } from '@/data/mockData';

const stats = [
  { label: 'Total Orders', value: orders.length.toString(), icon: ShoppingBag, trend: '+12%' },
  { label: 'Revenue', value: `₹${orders.reduce((s, o) => s + o.total, 0).toLocaleString()}`, icon: DollarSign, trend: '+8%' },
  { label: 'Products', value: products.length.toString(), icon: Package, trend: '' },
  { label: 'Low Stock', value: '2', icon: AlertTriangle, trend: '' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-2xl shadow-card p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              {stat.trend && (
                <span className="text-xs font-semibold text-accent flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> {stat.trend}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-card-foreground tabular-nums">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="font-serif font-semibold text-card-foreground">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Order ID</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Customer</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Total</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Payment</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-primary/5 transition-colors">
                  <td className="px-5 py-3 font-semibold tabular-nums">{order.id}</td>
                  <td className="px-5 py-3">{order.customerName}</td>
                  <td className="px-5 py-3 tabular-nums font-semibold">₹{order.total}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      order.paymentStatus === 'paid' ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary capitalize">
                      {order.orderStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top customers */}
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="font-serif font-semibold text-card-foreground">Top Customers</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Name</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Email</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Orders</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Spending</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-primary/5 transition-colors">
                  <td className="px-5 py-3 font-semibold">{c.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{c.email}</td>
                  <td className="px-5 py-3 tabular-nums">{c.ordersCount}</td>
                  <td className="px-5 py-3 tabular-nums font-semibold">₹{c.totalSpending.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
