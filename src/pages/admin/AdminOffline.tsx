import { useNavigate } from 'react-router-dom';
import { products as initialProducts } from '@/data/mockData';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

export default function AdminOffline() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAdd = (product: Product, selectedWeight: string, multiplier: number) => {
    addToCart(product, 1, selectedWeight, multiplier);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-serif font-bold">Offline Buying</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => navigate('/admin/offline/cart')}>View Cart</Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {initialProducts.map(p => (
          <ProductCard key={p.id} product={p} onBuy={handleAdd} />
        ))}
      </div>
    </div>
  );
}
