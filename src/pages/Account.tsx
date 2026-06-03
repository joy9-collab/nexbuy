import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { User, ShoppingBag, Heart, MapPin, LogOut } from "lucide-react";

const Account = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <main className="nexbuy-container py-20 text-center">
        <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="font-heading text-2xl font-bold mb-2">Sign in to your account</h1>
        <p className="text-muted-foreground mb-6">Access your orders, wishlist, and more.</p>
        <div className="flex gap-3 justify-center">
          <Link to="/login"><Button size="lg">Sign In</Button></Link>
          <Link to="/register"><Button size="lg" variant="outline">Create Account</Button></Link>
        </div>
      </main>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <main className="nexbuy-container py-8">
      <h1 className="font-heading text-3xl font-bold mb-2">My Account</h1>
      <p className="text-muted-foreground mb-8">Welcome back, {user?.name || user?.email}!</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/wishlist" className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
          <Heart className="h-8 w-8 text-primary mb-3" />
          <h3 className="font-heading font-semibold mb-1">Wishlist</h3>
          <p className="text-sm text-muted-foreground">Save products you love</p>
        </Link>
        <div className="bg-card rounded-lg border p-6 opacity-60">
          <ShoppingBag className="h-8 w-8 text-primary mb-3" />
          <h3 className="font-heading font-semibold mb-1">Order History</h3>
          <p className="text-sm text-muted-foreground">Coming soon</p>
        </div>
        <div className="bg-card rounded-lg border p-6 opacity-60">
          <MapPin className="h-8 w-8 text-primary mb-3" />
          <h3 className="font-heading font-semibold mb-1">Saved Addresses</h3>
          <p className="text-sm text-muted-foreground">Coming soon</p>
        </div>
      </div>

      <div className="mt-8">
        <Button variant="outline" onClick={handleLogout} className="gap-2">
          <LogOut className="h-4 w-4" /> Sign Out
        </Button>
      </div>
    </main>
  );
};

export default Account;
