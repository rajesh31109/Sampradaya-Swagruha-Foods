import { useState } from 'react';
import { motion } from 'framer-motion';
import { orders as initialOrders } from '@/data/mockData';
import { Order } from '@/types';
import { toast } from 'sonner';

const statusOptions: Order['orderStatus'][] = ['placed', 'confirmed', 'packed', 'shipped', 'out-for-delivery', 'delivered'];

export default function AdminOrders() {
  const [orderList, setOrderList] = useState<Order[]>(initialOrders);

  const updateStatus = (id: string, status: Order['orderStatus']) => {
    setOrderList(prev => prev.map(o => o.id === id ? { ...o, orderStatus: status } : o));
    toast.success(`Order ${id} updated to ${status}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-serif font-bold text-foreground">Orders</h2>

      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Order ID</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Customer</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Products</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Total</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Payment</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order, i) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border last:border-0 hover:bg-primary/5 transition-colors"
                >
                  <td className="px-5 py-3 font-semibold tabular-nums">{order.id}</td>
                  <td className="px-5 py-3">{order.customerName}</td>
                  <td className="px-5 py-3 text-muted-foreground">{order.items.map(i => i.product.name).join(', ')}</td>
                  <td className="px-5 py-3 tabular-nums font-semibold">₹{order.total}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      order.paymentStatus === 'paid' ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateStatus(order.id, e.target.value as Order['orderStatus'])}
                      className="text-xs font-semibold px-2 py-1 rounded-lg bg-primary/10 text-primary border-0 cursor-pointer"
                    >
                      {statusOptions.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
