import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, User, Heart, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import nexbuyLogo from "@/assets/nexbuy-logo.png";

const Navbar = () => {
  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/categories", label: "Categories" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="text-primary-foreground text-center text-sm py-2 font-medium bg-gradient-to-r from-primary via-accent to-primary">
        🚚 Free delivery on orders over R500 — Shop now!
      </div>
      <div className="nexbuy-container flex items-center justify-between h-16 border shadow-lg opacity-100 border-double">
        <Link to="/" className="flex items-center">
          <img src={nexbuyLogo} alt="Nexbuy" className="h-20" />
        </Link>

        <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-9"
            />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/wishlist" className="relative">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          <Link to={isAuthenticated ? "/account" : "/login"}>
            <Button variant="ghost" size="sm" className="gap-1.5 hidden sm:flex">
              <User className="h-4 w-4" />
              <span className="text-sm">{isAuthenticated ? "My Account" : "Sign In"}</span>
            </Button>
            <Button variant="ghost" size="icon" className="sm:hidden">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t bg-card pb-4">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="block px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              {link.label}
            </Link>
          ))}
          <Link to={isAuthenticated ? "/account" : "/login"} onClick={() => setMobileOpen(false)} className="block px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            {isAuthenticated ? "My Account" : "Sign In / Register"}
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
