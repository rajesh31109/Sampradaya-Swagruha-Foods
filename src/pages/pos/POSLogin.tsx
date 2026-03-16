import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { posUsers } from '@/data/mockData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function POSLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = posUsers.find(u => u.username === username && u.password === password);
    if (!user) {
      setError('Invalid credentials');
      return;
    }
    // store branch in session and navigate
    sessionStorage.setItem('pos_branch', user.branchId);
    sessionStorage.setItem('pos_user', user.username);
    navigate('/pos/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar hideCart />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-4xl w-full bg-card/80 rounded-3xl shadow-2xl overflow-hidden transform transition-transform hover:-translate-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="hidden md:flex items-center justify-center bg-primary/5 p-8">
              <div className="w-full h-full flex items-center justify-center">
                {/* Decorative panel - keeps brand look consistent */}
                <div className="w-56 h-56 bg-white rounded-xl shadow-md flex items-center justify-center">
                  <span className="text-4xl font-serif text-primary">S</span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-10">
              <div className="text-center mb-6">
                <span className="text-2xl font-serif font-bold text-primary">Sampradaya</span>
                <div className="text-sm text-muted-foreground">Swagruha Foods</div>
                <h2 className="text-xl font-semibold mt-3">POS Login</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Username</Label>
                  <Input value={username} onChange={(e) => setUsername(e.target.value)} className="ring-0 focus:ring-2 focus:ring-primary/60" />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="ring-0 focus:ring-2 focus:ring-primary/60" />
                </div>
                {/* Branch is determined from POS user credentials; removed manual selector */}
                {error && <div className="text-destructive text-sm">{error}</div>}

                <div className="pt-2">
                  <Button type="submit" className="w-full bg-primary hover:brightness-90">Login</Button>
                </div>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                <span>Need help? Contact the store manager.</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
