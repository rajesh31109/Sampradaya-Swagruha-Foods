import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { batches as initialBatches, products as allProducts } from '@/data/mockData';
import { Batch } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function AdminBatches() {
  const [batchList, setBatchList] = useState<Batch[]>(initialBatches);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const resolveDisplayName = (b: Batch) => {
    const prod = allProducts.find(p => p.id === b.productId || p.name === b.productName);
    const weight = b.selectedWeight || (prod ? (prod.prices ? (prod.prices['500g'] ? '500g' : (prod.prices['1kg'] ? '1kg' : Object.keys(prod.prices)[0])) : prod.weight) : undefined);
    return b.productName + (weight ? ` — ${weight}` : '');
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const prodSel = String(data.get('product_select') || '');
    let pid = '';
    let selWeight: string | undefined = undefined;
    if (prodSel) {
      const parts = prodSel.split('||');
      pid = parts[0];
      selWeight = parts[1];
    }
    const productObj = allProducts.find(p => p.id === pid);
    const newBatch: Batch = {
      id: `BATCH${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      productId: pid,
      productName: productObj?.name || String(data.get('productName') || ''),
      selectedWeight: selWeight,
      manufactureDate: data.get('manufactureDate') as string,
      expiryDate: data.get('expiryDate') as string,
      quantity: Number(data.get('quantity')),
      status: 'fresh',
    };
    setBatchList(prev => [...prev, newBatch]);
    setAddOpen(false);
    toast.success(`Batch ${newBatch.id} created with QR code`);
  };

  const qrData = (batch: Batch) => JSON.stringify({
    product: batch.productName + (batch.selectedWeight ? ` — ${batch.selectedWeight}` : ''),
    batchId: batch.id,
    manufactured: batch.manufactureDate,
    expiry: batch.expiryDate,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-serif font-bold text-foreground">Batches & QR Codes</h2>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button variant="hero"><Plus className="h-4 w-4 mr-2" /> New Batch</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-serif">Create Batch</DialogTitle></DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <Label>Product</Label>
                <select name="product_select" required className="w-full rounded-md border p-2 bg-card text-sm">
                  <option value="">Select product</option>
                  {allProducts.map(p => {
                    const weights = p.prices ? Object.keys(p.prices) : [p.weight];
                    return weights.map(w => (
                      <option key={`${p.id}-${w}`} value={`${p.id}||${w}`}>
                        {p.name} — {w}
                      </option>
                    ));
                  })}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Manufacture Date</Label><Input name="manufactureDate" type="date" required /></div>
                <div><Label>Expiry Date</Label><Input name="expiryDate" type="date" required /></div>
              </div>
              <div><Label>QR Codes Quantity</Label><Input name="quantity" type="number" required /></div>
              <Button variant="hero" type="submit" className="w-full">Create Batch</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-2xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3 text-muted-foreground font-medium">Batch ID</th>
                  <th className="text-left px-5 py-3 text-muted-foreground font-medium">Product</th>
                  <th className="text-left px-5 py-3 text-muted-foreground font-medium">Mfg Date</th>
                  <th className="text-left px-5 py-3 text-muted-foreground font-medium">Expiry</th>
                  <th className="text-left px-5 py-3 text-muted-foreground font-medium">QR Qty</th>
                  <th className="text-left px-5 py-3 text-muted-foreground font-medium">QR</th>
                </tr>
              </thead>
              <tbody>
                {batchList.map((b, i) => (
                  <motion.tr
                    key={b.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-border last:border-0 hover:bg-primary/5 transition-colors cursor-pointer"
                    onClick={() => setSelectedBatch(b)}
                  >
                    <td className="px-5 py-3 font-semibold tabular-nums">{b.id}</td>
                    <td className="px-5 py-3">{resolveDisplayName(b)}</td>
                    <td className="px-5 py-3 tabular-nums text-muted-foreground">{b.manufactureDate}</td>
                    <td className="px-5 py-3 tabular-nums text-muted-foreground">{b.expiryDate}</td>
                    <td className="px-5 py-3 tabular-nums">{b.quantity}</td>
                    <td className="px-5 py-3">
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedBatch(b); }}>
                        View QR
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* QR Preview */}
        <div className="bg-card rounded-2xl shadow-card p-6 h-fit sticky top-24">
          {selectedBatch ? (
            <div className="text-center">
              <h3 className="font-serif font-semibold text-card-foreground mb-4">QR Code — {selectedBatch.id}</h3>
              <div className="bg-background rounded-xl p-4 inline-block mb-4">
                <QRCodeSVG value={qrData(selectedBatch)} size={180} fgColor="#800000" />
              </div>
              <div className="text-sm text-left space-y-2">
                <p><span className="text-muted-foreground">Product:</span> <span className="font-semibold">{selectedBatch.productName}</span></p>
                <p><span className="text-muted-foreground">Batch:</span> <span className="font-semibold tabular-nums">{selectedBatch.id}</span></p>
                <p><span className="text-muted-foreground">Manufactured:</span> <span className="tabular-nums">{selectedBatch.manufactureDate}</span></p>
                <p><span className="text-muted-foreground">Expiry:</span> <span className="tabular-nums">{selectedBatch.expiryDate}</span></p>
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                <Download className="h-4 w-4 mr-2" /> Download QR
              </Button>
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-sm">Select a batch to view its QR code</p>
          )}
        </div>
      </div>
    </div>
  );
}
