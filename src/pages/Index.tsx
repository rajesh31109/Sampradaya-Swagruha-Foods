import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight, Shield, Leaf, Heart, Package, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import StorefrontLayout from '@/components/StorefrontLayout';
import { products, categories, reviews } from '@/data/mockData';
import heroFood from '@/assets/hero-food.jpg';
import productPickle from '@/assets/product-pickle.jpg';
import productSweet from '@/assets/product-sweet.jpg';
import productSnack from '@/assets/product-snack.jpg';
import productSpice from '@/assets/product-spice.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  }),
};

const whyChooseUs = [
  { icon: Heart, title: '100% Homemade', desc: 'Every product is handcrafted in our family kitchen with love.' },
  { icon: Shield, title: 'Traditional Recipes', desc: 'Generations-old recipes preserved in every batch.' },
  { icon: Leaf, title: 'Fresh Ingredients', desc: 'We source only the finest, freshest ingredients.' },
  { icon: Package, title: 'Hygienic Packaging', desc: 'Sealed for freshness, delivered with care.' },
];

export default function HomePage() {
  const featured = products.slice(0, 4);
  // Use a single hero image provided by the user at `src/assets/hero1.jpg` if present.
  const defaultHero = heroFood || productSweet;
  const heroCandidate = '/src/assets/hero1.jpg';
  const [heroImage, setHeroImage] = useState<string>(defaultHero);

  useEffect(() => {
    let mounted = true;
    const img = new Image();
    img.onload = () => { if (mounted) setHeroImage(heroCandidate); };
    img.onerror = () => { if (mounted) setHeroImage(defaultHero); };
    img.src = heroCandidate;
    return () => { mounted = false; };
  }, []);

  return (
    <StorefrontLayout>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center py-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="inline-block text-sm font-medium text-accent mb-4 tracking-wider uppercase">Est. Since Generations</span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-[1.1] mb-6">
              Authentic{' '}
              <span className="italic text-primary">Homemade</span>{' '}
              Goodness.
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8 text-pretty leading-relaxed">
              From our family kitchen to your table. Traditional recipes preserved for generations, made with love and the finest ingredients.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/products">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl hidden lg:block"
          >
            <motion.img
              key={heroImage}
              src={heroImage}
              alt="Traditional homemade food spread"
              className="object-cover w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-3">
              Explore Our Categories
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground max-w-lg mx-auto">
              Discover the full range of traditional delicacies from our kitchen.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Link
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="group block bg-card rounded-2xl shadow-card hover:shadow-card-hover p-6 text-center transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="mx-auto mb-3 h-20 w-20 rounded-xl overflow-hidden bg-muted/50 flex items-center justify-center">
                    <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" />
                  </div>
                  <h3 className="font-serif font-semibold text-card-foreground mb-1">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground">{cat.count} products</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Our most loved products, handpicked for you.</p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link to="/products">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-3">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Trusted by families across India for authentic homemade goodness.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
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
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-3">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl shadow-card p-6"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 text-pretty">"{review.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary font-serif font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-primary rounded-3xl p-12 sm:p-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-foreground mb-4">
            The Crunch of Tradition in Every Bite
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
            Hand-pounded spices meet sun-dried mangoes. No preservatives, just patience.
          </p>
          <Button variant="gold" size="xl" asChild>
            <Link to="/products">Explore Our Collection <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </StorefrontLayout>
  );
}
