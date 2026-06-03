import { Link } from "react-router-dom";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const Wishlist = () => {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <main className="nexbuy-container py-20 text-center">
        <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="font-heading text-2xl font-bold mb-2">Your wishlist is empty</h1>
        <p className="text-muted-foreground mb-6">Browse products and save your favourites!</p>
        <Link to="/"><Button size="lg">Browse Products</Button></Link>
      </main>
    );
  }

  return (
    <main className="nexbuy-container py-8">
      <h1 className="font-heading text-3xl font-bold mb-8">My Wishlist</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
};

export default Wishlist;
