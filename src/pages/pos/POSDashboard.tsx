import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products, branchProducts } from '@/data/mockData';
import { Product } from '@/types';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function POSDashboard() {
  const navigate = useNavigate();
  const branchId = sessionStorage.getItem('pos_branch');
  const [tab, setTab] = useState<'products'|'billing'>('products');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<Array<{product:Product, weight:string, price:number, qty:number}>>([]);

  useEffect(() => {
    if (!branchId) navigate('/pos');
  }, [branchId, navigate]);
  // include navigate to satisfy hook deps

  const availableProducts = useMemo(() => {
    const ids = branchId ? (branchProducts[branchId] || []) : products.map(p => p.id);
    return products.filter(p => ids.includes(p.id)) as Product[];
  }, [branchId]);

  const filtered = useMemo(() => availableProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase())), [availableProducts, query]);

  const addToCart = (p: Product, weight: string, price: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === p.id && i.weight === weight);
      if (existing) return prev.map(i => i.product.id === p.id && i.weight === weight ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product: p, weight, price, qty: 1 }];
    });
  };

  const weightOptions = (p: Product) => {
    if (p.prices) return Object.keys(p.prices).map(k => ({ label: k, price: p.prices![k] }));
    return [{ label: p.weight, price: p.price }];
  };

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  const inc = (index:number) => setCart(prev => prev.map((c,i)=> i===index?{...c, qty:c.qty+1}:c));
  const dec = (index:number) => setCart(prev => prev.map((c,i)=> i===index?{...c, qty: Math.max(0,c.qty-1)}:c).filter(c=>c.qty>0));
  const remove = (index:number) => setCart(prev => prev.filter((_,i)=>i!==index));

  // Persist sales per branch in sessionStorage
  const placeOrder = () => {
    if (!branchId) return alert('No branch selected');
    if (cart.length === 0) return alert('No items in cart');
    const salesKey = 'pos_sales';
    const existing = JSON.parse(sessionStorage.getItem(salesKey) || '[]');
    const sale = { branchId, items: cart.map(c => ({ id: c.product.id, name: c.product.name, weight: c.weight, price: c.price, qty: c.qty })), date: new Date().toISOString() };
    existing.push(sale);
    sessionStorage.setItem(salesKey, JSON.stringify(existing));
    setCart([]);
    alert('Order placed (mock)');
  };

  // Compute sold products for this branch
  const soldProducts = useMemo(() => {
    const salesKey = 'pos_sales';
    const all = JSON.parse(sessionStorage.getItem(salesKey) || '[]') as Array<any>;
    const forBranch = all.filter(s => s.branchId === branchId);
    const agg: Record<string, { id:string; name:string; qty:number }> = {};
    forBranch.forEach(s => {
      s.items.forEach((it: any) => {
        if (!agg[it.id]) agg[it.id] = { id: it.id, name: it.name, qty: 0 };
        agg[it.id].qty += it.qty;
      });
    });
    return Object.values(agg);
  }, [branchId, cart]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6 flex-1">
        <div className="flex items-start gap-6">
        {/* Left: product area */}
        {tab === 'products' && (
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setTab('products')} className={`px-4 py-2 rounded ${tab==='products'? 'bg-primary text-primary-foreground':'bg-muted'}`}>Product Sale</button>
              <button onClick={() => setTab('billing')} className={`px-4 py-2 rounded ${tab==='billing'? 'bg-primary text-primary-foreground':'bg-muted'}`}>Billing</button>
            </div>
            <div className="w-80">
              <Input placeholder="Search products..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(p => (
              <div key={p.id} className="bg-card rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
                <img src={p.image} className="h-44 w-full object-cover rounded-md" alt={p.name} />
                <div className="flex-1">
                  <h4 className="font-serif font-semibold text-lg">{p.name}</h4>
                  <p className="text-sm text-muted-foreground">{p.category}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {weightOptions(p).map(w => (
                    <button key={w.label} onClick={() => { addToCart(p, w.label, w.price); setTab('billing'); }} className="px-3 py-2 bg-muted rounded-md text-sm shadow-sm">{w.label} — ₹{w.price}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: billing panel */}
        <aside className="w-96 sticky top-6">
          <div className="bg-gradient-to-b from-white/80 to-muted/60 rounded-2xl shadow-card p-4 h-[80vh] flex flex-col border">
            <div className="mb-4">
              <h3 className="font-serif font-semibold text-lg text-primary">Order</h3>
              <p className="text-sm text-muted-foreground">POS Branch: {branchId}</p>
            </div>

            <div className="flex-1 overflow-auto space-y-3">
              {cart.length === 0 && <div className="text-sm text-muted-foreground">No items selected</div>}
              {cart.map((c, i) => (
                <div key={i} className="flex items-center justify-between bg-white/60 rounded-md p-3">
                  <div>
                    <div className="font-medium">{c.product.name}</div>
                    <div className="text-sm text-muted-foreground">{c.weight} • ₹{c.price}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button className="px-2 py-1 rounded bg-primary text-primary-foreground" onClick={() => dec(i)}>-</button>
                      <div className="px-3 py-1 bg-white rounded">{c.qty}</div>
                      <button className="px-2 py-1 rounded bg-primary text-primary-foreground" onClick={() => inc(i)}>+</button>
                      <button className="ml-2 text-destructive" onClick={() => remove(i)}>Remove</button>
                    </div>
                  </div>
                  <div className="font-semibold">₹{c.price * c.qty}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 mt-4">
              <div className="flex justify-between mb-2"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">₹{subtotal}</span></div>
              <div className="flex justify-between mb-2"><span className="text-muted-foreground">Tax (5%)</span><span className="font-semibold">₹{tax}</span></div>
              <div className="flex justify-between text-lg font-bold mt-3"><span>Total</span><span>₹{total}</span></div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => setCart([])}>Clear</Button>
                <Button onClick={() => placeOrder()}>Place Order</Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
          </div>
          {soldProducts.length > 0 && (
            <div className="mt-8">
              <h4 className="font-semibold mb-3">Sold products (this branch)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {soldProducts.map(s => (
                  <div key={s.id} className="p-3 bg-muted rounded-md flex items-center justify-between">
                    <div className="font-medium">{s.name}</div>
                    <div className="text-sm text-muted-foreground">Qty: {s.qty}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        )}
      <Footer />
    </div>
  );
}
