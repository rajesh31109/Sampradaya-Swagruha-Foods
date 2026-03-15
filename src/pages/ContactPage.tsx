import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import StorefrontLayout from '@/components/StorefrontLayout';
import { toast } from 'sonner';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.');
  };

  return (
    <StorefrontLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-3">Get in Touch</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">We'd love to hear from you. Reach out for orders, questions, or just to say hello.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl shadow-card p-6 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label htmlFor="name">Name</Label><Input id="name" required placeholder="Your name" /></div>
              <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required placeholder="you@example.com" /></div>
            </div>
            <div><Label htmlFor="subject">Subject</Label><Input id="subject" required placeholder="How can we help?" /></div>
            <div><Label htmlFor="message">Message</Label><Textarea id="message" required placeholder="Your message..." rows={5} /></div>
            <Button variant="hero" type="submit" className="w-full">Send Message</Button>
          </motion.form>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
            {[
              { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
              { icon: Mail, label: 'Email', value: 'hello@sampradaya.com' },
              { icon: MapPin, label: 'Address', value: 'Jubilee Hills, Hyderabad, Telangana 500033' },
            ].map(item => (
              <div key={item.label} className="flex gap-4 items-start bg-card rounded-2xl shadow-card p-5">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </div>
              </div>
            ))}

            <div className="bg-muted rounded-2xl h-64 flex items-center justify-center text-muted-foreground text-sm">
              📍 Map placeholder — Hyderabad, Telangana
            </div>
          </motion.div>
        </div>
      </div>
    </StorefrontLayout>
  );
}
