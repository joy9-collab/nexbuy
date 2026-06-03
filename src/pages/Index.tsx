import { Link } from "react-router-dom";
import { useState } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import EmailPopup from "@/components/EmailPopup";
import heroBanner from "@/assets/hero-banner.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Truck, Shield, CreditCard } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ScrollSection = ({ children, className = "", animation = "animate-scroll-reveal-up", delay = 0 }: { children: React.ReactNode; className?: string; animation?: string; delay?: number }) => {
  const { ref, inView } = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`${className} ${inView ? animation : "opacity-0"}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const featured = products.filter((p) => p.stock !== "out-of-stock");
  const trending = products.filter((p) => p.badge === "trending");
  const bestsellers = products.filter((p) => p.badge === "bestseller");

  const searchResults = searchQuery.trim()
    ? featured.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[420px] md:h-[500px] overflow-hidden">
        <img src={heroBanner} alt="Shop the best deals in South Africa" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative nexbuy-container h-full flex flex-col justify-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground max-w-xl animate-fade-in">
            Shop Smarter, <span className="text-accent">Save More</span>
          </h1>
          <p className="mt-4 text-primary-foreground/90 text-lg max-w-md animate-fade-in" style={{ animationDelay: "0.1s" }}>
            South Africa's trusted marketplace for quality products at unbeatable prices.
          </p>
          <div className="mt-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Link to="/categories">
              <Button size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold">
                Browse Products <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Search results */}
      {searchResults !== null ? (
        <section className="nexbuy-container py-8">
          <h2 className="font-heading text-2xl font-bold mb-6">
            {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for "{searchQuery}"
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {searchResults.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {searchResults.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No products found. Try a different search.</p>
          )}
        </section>
      ) : (
        <>
          {/* Trust bar */}
          <ScrollSection className="border-b bg-card" animation="animate-scroll-reveal-up">
            <div className="nexbuy-container py-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="flex items-center justify-center gap-3">
                <Truck className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Free delivery over R500</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Buyer protection guaranteed</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <CreditCard className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Secure payments</span>
              </div>
            </div>
          </ScrollSection>

          {/* Trending */}
          {trending.length > 0 && (
            <ScrollSection className="nexbuy-container py-12" animation="animate-scroll-reveal-up" delay={0.1}>
              <h2 className="font-heading text-2xl font-bold mb-6">🔥 Trending Now</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {trending.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </ScrollSection>
          )}

          {/* Best Sellers */}
          {bestsellers.length > 0 && (
            <ScrollSection className="bg-muted/50" animation="animate-scroll-reveal-up" delay={0.1}>
              <div className="nexbuy-container py-12">
                <h2 className="font-heading text-2xl font-bold mb-6">⭐ Best Sellers</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {bestsellers.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            </ScrollSection>
          )}

          {/* All Products */}
          <ScrollSection className="nexbuy-container py-12" animation="animate-scroll-reveal-up" delay={0.1}>
            <h2 className="font-heading text-2xl font-bold mb-6">All Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </ScrollSection>
        </>
      )}

      <EmailPopup />
    </main>
  );
};

export default Index;
