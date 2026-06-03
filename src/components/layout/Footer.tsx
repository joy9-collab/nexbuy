import { Link } from "react-router-dom";
import nexbuyLogo from "@/assets/nexbuy-logo.png";

const Footer = () => (
  <footer className="border-t bg-card mt-16">
    <div className="nexbuy-container py-12 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="mb-4">
            <img src={nexbuyLogo} alt="Nexbuy" className="h-8" />
          </div>
          <p className="text-sm text-muted-foreground">
            South Africa's trusted online marketplace. Quality products, great prices, delivered to your door.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground transition-colors">All Products</Link></li>
            <li><Link to="/categories" className="hover:text-foreground transition-colors">Categories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
            <li><Link to="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Payment Methods</h4>
          <p className="text-sm text-muted-foreground">PayFast · Ozow · PayPal · Visa · Mastercard</p>
          <p className="text-xs text-muted-foreground mt-4">© {new Date().getFullYear()} Nexbuy. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
