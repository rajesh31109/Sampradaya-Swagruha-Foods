import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Package, Layers, ShoppingBag, Users, BarChart3, Settings, Menu, X, QrCode
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { label: 'Products', icon: Package, path: '/admin/products' },
    // billing name removed per request
  { label: 'Batches & QR', icon: QrCode, path: '/admin/batches' },
  { label: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
  { label: 'Sold Products', icon: BarChart3, path: '/admin/sold-products' },
  { label: 'Profile', icon: Settings, path: '/admin/settings' },
];

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary transform transition-transform duration-200 lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <Link to="/admin" className="text-primary-foreground font-serif text-xl font-bold">
            Sampradaya
          </Link>
          <p className="text-primary-foreground/50 text-xs mt-1">Admin Panel</p>
        </div>

        <nav className="px-3 space-y-1">
          {menuItems.map(item => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-foreground/10 text-primary-foreground border-l-2 border-accent'
                    : 'text-primary-foreground/60 hover:text-primary-foreground/80 hover:bg-primary-foreground/5'
                }`}
              >
                <item.icon className="h-4 w-4" strokeWidth={1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-3 right-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 text-sm text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors"
          >
            ← Back to Store
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-4 sticky top-0 z-30">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <h2 className="font-serif font-semibold text-foreground">
            {menuItems.find(m => location.pathname === m.path || (m.path !== '/admin' && location.pathname.startsWith(m.path)))?.label || 'Dashboard'}
          </h2>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
