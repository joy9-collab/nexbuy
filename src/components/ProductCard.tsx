import { Link } from "react-router-dom";
import { Product, getAdjustedPrice, formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Star, Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const badgeClass: Record<string, string> = {
  trending: "badge-trending",
  bestseller: "badge-bestseller",
  limited: "badge-limited",
};

const badgeLabel: Record<string, string> = {
  trending: "🔥 Trending",
  bestseller: "⭐ Best Seller",
  limited: "⚡ Limited Stock",
};

const ProductCard = ({ product }: { product: Product }) => {
  const price = getAdjustedPrice(product.basePrice);
  const isAvailable = product.stock !== "out-of-stock";
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);
  const { ref, inView } = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`group relative bg-card rounded-lg border overflow-hidden product-card-hover ${!isAvailable ? "opacity-60" : ""} ${inView ? "animate-scroll-reveal-scale" : "opacity-0"}`}>
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        {product.badge && (
          <span className={`absolute top-3 left-3 ${badgeClass[product.badge]}`}>
            {badgeLabel[product.badge]}
          </span>
        )}
      </Link>
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 h-8 w-8 rounded-full bg-card/80 backdrop-blur flex items-center justify-center transition-colors hover:bg-card"
        aria-label="Toggle wishlist"
      >
        <Heart className={`h-4 w-4 ${wishlisted ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
      </button>
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-heading font-semibold text-sm leading-tight mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-heading font-bold text-lg text-primary">{formatPrice(price)}</span>
          <Link to={`/product/${product.id}`}>
            <Button size="sm" disabled={!isAvailable} variant={isAvailable ? "default" : "secondary"}>
              {isAvailable ? "View" : "Sold Out"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
