import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const OrderConfirmation = () => {
  const orderNumber = `NB-${Date.now().toString(36).toUpperCase()}`;

  return (
    <main className="nexbuy-container py-20 text-center max-w-lg mx-auto">
      <CheckCircle className="h-20 w-20 mx-auto text-success mb-6" />
      <h1 className="font-heading text-3xl font-bold mb-3">Order Confirmed!</h1>
      <p className="text-muted-foreground mb-2">
        Thank you for shopping with Nexbuy. Your order has been placed successfully.
      </p>
      <p className="text-sm font-medium mb-8">
        Order Number: <span className="text-primary font-bold">{orderNumber}</span>
      </p>
      <div className="bg-card rounded-lg border p-6 text-left space-y-2 mb-8 text-sm">
        <p className="text-muted-foreground">📧 A confirmation email will be sent shortly.</p>
        <p className="text-muted-foreground">🚚 Estimated delivery: 3-7 business days within South Africa.</p>
        <p className="text-muted-foreground">📦 You can track your order from your account dashboard.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/"><Button size="lg">Continue Shopping</Button></Link>
        <Link to="/account"><Button size="lg" variant="outline">My Account</Button></Link>
      </div>
    </main>
  );
};

export default OrderConfirmation;
