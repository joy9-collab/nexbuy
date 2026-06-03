import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { formatPrice, getAdjustedPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { CreditCard, Smartphone, Globe, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = totalPrice >= 500 ? 0 : 75;
  const orderTotal = totalPrice + deliveryFee;

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });

  if (items.length === 0) {
    return (
      <main className="nexbuy-container py-20 text-center">
        <h1 className="font-heading text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add some products before checking out.</p>
        <Link to="/"><Button size="lg">Continue Shopping</Button></Link>
      </main>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const required = ["email", "firstName", "lastName", "address", "city", "province", "postalCode"] as const;
    for (const field of required) {
      if (!form[field].trim()) {
        toast.error("Please fill in all required fields.");
        return;
      }
    }
    setIsSubmitting(true);
    setTimeout(() => {
      clearCart();
      navigate("/order-confirmation");
    }, 1500);
  };

  return (
    <main className="nexbuy-container py-8">
      <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to cart
      </Link>
      <h1 className="font-heading text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Contact */}
          <section className="bg-card rounded-lg border p-6 space-y-4">
            <h2 className="font-heading text-lg font-bold">Contact Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.co.za" />
              </div>
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+27" />
              </div>
            </div>
          </section>

          {/* Shipping */}
          <section className="bg-card rounded-lg border p-6 space-y-4">
            <h2 className="font-heading text-lg font-bold">Shipping Address</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input id="address" name="address" value={form.address} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input id="city" name="city" value={form.city} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="province">Province *</Label>
                <Input id="province" name="province" value={form.province} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code *</Label>
                <Input id="postalCode" name="postalCode" value={form.postalCode} onChange={handleChange} />
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="bg-card rounded-lg border p-6 space-y-4">
            <h2 className="font-heading text-lg font-bold">Payment Method</h2>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="card" id="card" />
                <CreditCard className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Credit / Debit Card</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="payfast" id="payfast" />
                <Smartphone className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">PayFast</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="ozow" id="ozow" />
                <Smartphone className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Ozow (Instant EFT)</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="paypal" id="paypal" />
                <Globe className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">PayPal</span>
              </label>
            </RadioGroup>
          </section>
        </div>

        {/* Order Summary */}
        <div className="bg-card rounded-lg border p-6 h-fit sticky top-28 space-y-4">
          <h2 className="font-heading text-lg font-bold">Order Summary</h2>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground line-clamp-1 flex-1">{product.title} × {quantity}</span>
                <span className="font-medium ml-2">{formatPrice(getAdjustedPrice(product.basePrice) * quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-medium text-success">{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span className="font-heading font-bold">Total</span>
              <span className="font-heading font-bold text-lg text-primary">{formatPrice(orderTotal)}</span>
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full font-heading font-semibold" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : `Pay ${formatPrice(orderTotal)}`}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Your payment is secured and encrypted.
          </p>
        </div>
      </form>
    </main>
  );
};

export default Checkout;
