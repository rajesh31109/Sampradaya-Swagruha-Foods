import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import StorefrontLayout from '@/components/StorefrontLayout';
import { toast } from 'sonner';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isSignUp ? 'Account created!' : 'Welcome back!');
    navigate('/');
  };

  return (
    <StorefrontLayout>
      <div className="max-w-md mx-auto px-4 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl shadow-card p-8">
          <h1 className="text-2xl font-serif font-bold text-center text-card-foreground mb-6">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div><Label htmlFor="name">Full Name</Label><Input id="name" required placeholder="Your name" /></div>
            )}
            <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required placeholder="you@example.com" /></div>
            <div><Label htmlFor="password">Password</Label><Input id="password" type="password" required placeholder="••••••••" /></div>
            <Button variant="hero" type="submit" className="w-full" size="lg">
              {isSignUp ? 'Sign Up' : 'Login'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-primary font-semibold hover:underline">
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </motion.div>
      </div>
    </StorefrontLayout>
  );
}
