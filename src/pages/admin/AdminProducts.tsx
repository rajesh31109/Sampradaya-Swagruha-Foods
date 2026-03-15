import { useState } from 'react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { products as initialProducts } from '@/data/mockData';
import { Product } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function AdminProducts() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id: string) => {
    setProductList(prev => prev.filter(p => p.id !== id));
    toast.success('Product deleted');
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const prices: Record<string, number> = {};
    const p250 = Number(data.get('price_250'));
    const p500 = Number(data.get('price_500'));
    const p750 = Number(data.get('price_750'));
    const p1kg = Number(data.get('price_1kg'));
    if (!isNaN(p250) && p250 > 0) prices['250g'] = p250;
    if (!isNaN(p500) && p500 > 0) prices['500g'] = p500;
    if (!isNaN(p750) && p750 > 0) prices['750g'] = p750;
    if (!isNaN(p1kg) && p1kg > 0) prices['1kg'] = p1kg;

    // Pick a base price/weight for the main listing: prefer 500g, then 1kg, then 250g, then 750g, else use explicit price field
    const baseWeight = prices['500g'] ? '500g' : prices['1kg'] ? '1kg' : prices['250g'] ? '250g' : prices['750g'] ? '750g' : undefined;
    const basePrice = baseWeight ? prices[baseWeight] : (Number(data.get('price')) || 0);

    const imgFile = data.get('image') as File | null;

    let imageUrl = editProduct?.image || '/placeholder.svg';
    if (imgFile && imgFile.size) {
      imageUrl = URL.createObjectURL(imgFile);
    }

    const newProduct: Product = {
      id: editProduct?.id || `p${Date.now()}`,
      name: (data.get('name') as string) || 'Untitled',
      category: (data.get('category') as string) || 'Sweets',
      price: basePrice,
      weight: baseWeight || (data.get('weight') as string) || '500g',
      shelfLife: editProduct?.shelfLife || '',
      description: (data.get('description') as string) || '',
      shortDescription: ((data.get('description') as string) || '').slice(0, 60),
      ingredients: ((data.get('ingredients') as string) || '').split(',').map(s => s.trim()).filter(Boolean),
      image: imageUrl,
      rating: editProduct?.rating || 4.5,
      reviewCount: editProduct?.reviewCount || 0,
      inStock: true,
      prices: Object.keys(prices).length ? prices : undefined,
    };

    if (editProduct) {
      setProductList(prev => prev.map(p => p.id === editProduct.id ? newProduct : p));
      toast.success('Product updated');
    } else {
      setProductList(prev => [...prev, newProduct]);
      toast.success('Product added');
    }
    setEditProduct(null);
    setDialogOpen(false);
    setImagePreview(null);
  };

  useEffect(() => {
    // when editing, prefill image preview
    if (editProduct) setImagePreview(editProduct.image ?? null);
  }, [editProduct]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-serif font-bold text-foreground">Products</h2>
        <div className="flex items-center gap-4">
          <Input placeholder="Search products or categories..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-64" />
          <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) { setEditProduct(null); setImagePreview(null); } }}>
            <DialogTrigger asChild>
              <Button variant="hero" onClick={() => setEditProduct(null)}>
                <Plus className="h-4 w-4 mr-2" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-serif">{editProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div><Label>Name</Label><Input name="name" required defaultValue={editProduct?.name} /></div>
              <div>
                <Label>Category</Label>
                <select name="category" required defaultValue={editProduct?.category || 'Sweets'} className="w-full rounded-md border p-2 bg-card text-sm">
                  <option>Sweets</option>
                  <option>Chips</option>
                  <option>Pappads</option>
                  <option>Pickles</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>250g Price (₹)</Label>
                  <Input name="price_250" type="number" defaultValue={editProduct?.prices?.['250g'] ?? ''} />
                </div>
                <div>
                  <Label>500g Price (₹)</Label>
                  <Input name="price_500" type="number" defaultValue={editProduct?.prices?.['500g'] ?? ''} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>750g Price (₹)</Label>
                  <Input name="price_750" type="number" defaultValue={editProduct?.prices?.['750g'] ?? ''} />
                </div>
                <div>
                  <Label>1kg Price (₹)</Label>
                  <Input name="price_1kg" type="number" defaultValue={editProduct?.prices?.['1kg'] ?? ''} />
                </div>
              </div>

              <div>
                <Label>Description (optional)</Label>
                <Input name="description" defaultValue={editProduct?.description} />
              </div>
              <div>
                <Label>Ingredients (comma separated)</Label>
                <Input name="ingredients" defaultValue={editProduct?.ingredients?.join(', ')} />
              </div>

              <div>
                <Label>Image (optional)</Label>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = (e.target as HTMLInputElement).files?.[0];
                    if (f) setImagePreview(URL.createObjectURL(f));
                    else setImagePreview(null);
                  }}
                  className="w-full"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img src={imagePreview} alt="preview" className="h-28 rounded-md object-cover" />
                  </div>
                )}
              </div>

              <Button variant="hero" type="submit" className="w-full">Save Product</Button>
            </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Name</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Category</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Price</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Weight</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productList.filter(p => {
                const term = searchTerm.trim().toLowerCase();
                if (!term) return true;
                return p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term);
              }).map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border last:border-0 hover:bg-primary/5 transition-colors"
                >
                  <td className="px-5 py-3 font-semibold">{p.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-5 py-3 tabular-nums font-semibold">₹{p.price}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.weight}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditProduct(p); setDialogOpen(true); }}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(p.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
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
