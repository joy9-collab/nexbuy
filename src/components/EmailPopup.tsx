import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

const EmailPopup = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("nexbuy-popup-dismissed");
    if (dismissed) return;
    const timer = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem("nexbuy-popup-dismissed", "1");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      sessionStorage.setItem("nexbuy-popup-dismissed", "1");
      setTimeout(() => setShow(false), 2000);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-card rounded-xl border shadow-2xl max-w-md w-full p-8 relative">
        <button onClick={handleClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>
        {submitted ? (
          <div className="text-center py-4">
            <p className="font-heading text-xl font-bold text-primary mb-2">🎉 You're in!</p>
            <p className="text-sm text-muted-foreground">Check your inbox for your welcome discount.</p>
          </div>
        ) : (
          <>
            <h3 className="font-heading text-2xl font-bold mb-2">Get 10% Off</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter and get 10% off your first order. Be the first to know about new arrivals and exclusive deals.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input placeholder="your@email.co.za" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1" />
              <Button type="submit">Subscribe</Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">No spam, unsubscribe anytime.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailPopup;
