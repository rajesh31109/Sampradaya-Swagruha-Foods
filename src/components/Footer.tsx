import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h3 className="text-xl font-serif font-bold mb-4">Sampradaya</h3>
            <p className="text-primary-foreground/70 text-sm text-pretty leading-relaxed">
              Authentic homemade food products crafted with traditional recipes, fresh ingredients, and generations of love.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/60">Quick Links</h4>
            <ul className="space-y-3">
              {['Products', 'About', 'Contact'].map(link => (
                <li key={link}>
                  <Link to={`/${link.toLowerCase()}`} className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/pos" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                  Point of Sale
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/60">Customer Care</h4>
            <ul className="space-y-3">
              {['Track Order', 'Shipping Policy', 'Returns', 'FAQ'].map(link => (
                <li key={link}>
                  <span className="text-sm text-primary-foreground/70 hover:text-gold transition-colors cursor-pointer">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/60">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li>📞 +91 98765 43210</li>
              <li>✉️ hello@sampradaya.com</li>
              <li>📍 Hyderabad, Telangana</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/50">
          © 2026 Sampradaya Swagruha Foods. Made with ❤️ and tradition.
        </div>
      </div>
    </footer>
  );
}
