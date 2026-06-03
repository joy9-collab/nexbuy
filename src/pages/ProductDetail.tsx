import { useParams, Link } from "react-router-dom";
import { products, getAdjustedPrice, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, ArrowLeft, Check, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const stockConfig = {
  "in-stock": { label: "In Stock", icon: Check, className: "text-success" },
  limited: { label: "Limited Stock", icon: AlertTriangle, className: "text-warning" },
  "out-of-stock": { label: "Out of Stock", icon: AlertTriangle, className: "text-destructive" },
};

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="nexbuy-container py-20 text-center">
        <h1 className="font-heading text-2xl font-bold mb-4">Product Not Found</h1>
        <Link to="/"><Button>Back to Home</Button></Link>
      </div>
    );
  }

  const price = getAdjustedPrice(product.basePrice);
  const stockInfo = stockConfig[product.stock];
  const StockIcon = stockInfo.icon;
  const isAvailable = product.stock !== "out-of-stock";

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <main className="nexbuy-container py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to products
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="aspect-square rounded-lg overflow-hidden bg-muted border">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
          <h1 className="font-heading text-3xl font-bold mb-3">{product.title}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-medium">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
          </div>

          <span className="font-heading text-4xl font-bold text-primary mb-4">{formatPrice(price)}</span>

          <div className={`flex items-center gap-2 mb-6 ${stockInfo.className}`}>
            <StockIcon className="h-4 w-4" />
            <span className="text-sm font-medium">{stockInfo.label}</span>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

          <Button
            size="lg"
            disabled={!isAvailable}
            onClick={handleAddToCart}
            className="gap-2 font-heading font-semibold w-full md:w-auto"
          >
            <ShoppingCart className="h-5 w-5" />
            {isAvailable ? "Add to Cart" : "Out of Stock"}
          </Button>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border">
            <p className="text-xs text-muted-foreground">
              🚚 Free delivery on orders over R500. Estimated delivery: 3-7 business days within South Africa.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
