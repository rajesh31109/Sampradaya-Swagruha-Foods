import { useState } from 'react';
import { motion } from 'framer-motion';
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

  const handleDelete = (id: string) => {
    setProductList(prev => prev.filter(p => p.id !== id));
    toast.success('Product deleted');
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const newProduct: Product = {
      id: editProduct?.id || `p${Date.now()}`,
      name: data.get('name') as string,
      category: data.get('category') as string,
      price: Number(data.get('price')),
      weight: data.get('weight') as string,
      shelfLife: data.get('shelfLife') as string,
      description: data.get('description') as string,
      shortDescription: (data.get('description') as string).slice(0, 60),
      ingredients: (data.get('ingredients') as string).split(',').map(s => s.trim()),
      image: '/placeholder.svg',
      rating: editProduct?.rating || 4.5,
      reviewCount: editProduct?.reviewCount || 0,
      inStock: true,
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
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-serif font-bold text-foreground">Products</h2>
        <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) setEditProduct(null); }}>
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
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Category</Label><Input name="category" required defaultValue={editProduct?.category} /></div>
                <div><Label>Price (₹)</Label><Input name="price" type="number" required defaultValue={editProduct?.price} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Weight</Label><Input name="weight" required defaultValue={editProduct?.weight} /></div>
                <div><Label>Shelf Life</Label><Input name="shelfLife" required defaultValue={editProduct?.shelfLife} /></div>
              </div>
              <div><Label>Description</Label><Input name="description" required defaultValue={editProduct?.description} /></div>
              <div><Label>Ingredients (comma separated)</Label><Input name="ingredients" required defaultValue={editProduct?.ingredients.join(', ')} /></div>
              <Button variant="hero" type="submit" className="w-full">Save Product</Button>
            </form>
          </DialogContent>
        </Dialog>
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
              {productList.map((p, i) => (
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
