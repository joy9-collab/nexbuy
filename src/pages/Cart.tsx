import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { getAdjustedPrice, formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <main className="nexbuy-container py-20 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="font-heading text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Browse our products and find something you love!</p>
        <Link to="/"><Button size="lg">Continue Shopping</Button></Link>
      </main>
    );
  }

  return (
    <main className="nexbuy-container py-8">
      <h1 className="font-heading text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => {
            const price = getAdjustedPrice(product.basePrice);
            return (
              <div key={product.id} className="flex gap-4 p-4 bg-card rounded-lg border">
                <Link to={`/product/${product.id}`} className="shrink-0">
                  <img src={product.image} alt={product.title} className="w-20 h-20 md:w-24 md:h-24 rounded-md object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-heading font-semibold text-sm md:text-base hover:text-primary transition-colors line-clamp-1">{product.title}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <p className="font-heading font-bold text-primary mt-1">{formatPrice(price)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(product.id, quantity - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(product.id, quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive ml-2" onClick={() => removeFromCart(product.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="hidden md:block text-right">
                  <p className="font-heading font-bold">{formatPrice(price * quantity)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="bg-card rounded-lg border p-6 h-fit sticky top-28">
          <h2 className="font-heading text-lg font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-medium text-success">{totalPrice >= 500 ? "Free" : formatPrice(75)}</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span className="font-heading font-bold">Total</span>
              <span className="font-heading font-bold text-lg text-primary">
                {formatPrice(totalPrice + (totalPrice >= 500 ? 0 : 75))}
              </span>
            </div>
          </div>
          <Link to="/checkout">
            <Button size="lg" className="w-full mt-6 font-heading font-semibold">
              Proceed to Checkout
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Secure payment via PayFast, Ozow, or PayPal
          </p>
        </div>
      </div>
    </main>
  );
};

export default Cart;
