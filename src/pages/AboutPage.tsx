import { motion } from 'framer-motion';
import { Heart, Leaf, Shield, Award } from 'lucide-react';
import StorefrontLayout from '@/components/StorefrontLayout';
import heroFood from '@/assets/hero-food.jpg';

export default function AboutPage() {
  return (
    <StorefrontLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-sm font-medium text-accent uppercase tracking-wider">Our Story</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mt-2 mb-6 leading-tight">
              A Legacy of <span className="italic text-primary">Authentic</span> Taste
            </h1>
            <p className="text-muted-foreground text-pretty leading-relaxed mb-4">
              Sampradaya Swagruha Foods was born from a simple belief: the best food comes from home kitchens, made with love, patience, and generations of knowledge.
            </p>
            <p className="text-muted-foreground text-pretty leading-relaxed mb-4">
              Every product we craft carries the essence of traditional Indian cooking. We source the finest ingredients — from sun-dried Guntur chillies to cold-pressed sesame oil — and prepare them using time-honored methods passed down through our family.
            </p>
            <p className="text-muted-foreground text-pretty leading-relaxed">
              No shortcuts. No preservatives. Just authentic homemade goodness, delivered from our kitchen to yours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="aspect-square rounded-3xl overflow-hidden shadow-card"
          >
            <img src={heroFood} alt="Traditional food preparation" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Heart, title: 'Made with Love', desc: 'Every product is handcrafted in our family kitchen.' },
            { icon: Leaf, title: 'Fresh & Natural', desc: 'No preservatives or artificial ingredients. Ever.' },
            { icon: Shield, title: 'Quality Assured', desc: 'Rigorous quality checks at every step.' },
            { icon: Award, title: 'Trusted Legacy', desc: 'Recipes preserved across generations.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl shadow-card p-6 text-center"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif font-semibold text-card-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </StorefrontLayout>
  );
}
