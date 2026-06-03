import { useState } from "react";
import { products, categories, formatPrice, getAdjustedPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings, Package, Tag } from "lucide-react";

const Admin = () => {
  const [markup, setMarkup] = useState(20);
  const [disabledProducts, setDisabledProducts] = useState<Set<string>>(new Set());
  const [hiddenCategories, setHiddenCategories] = useState<Set<string>>(new Set());
  const [priceOverrides, setPriceOverrides] = useState<Record<string, string>>({});

  const toggleProduct = (id: string) => {
    setDisabledProducts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleCategory = (cat: string) => {
    setHiddenCategories((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  return (
    <main className="nexbuy-container py-8">
      <h1 className="font-heading text-3xl font-bold mb-8 flex items-center gap-3">
        <Settings className="h-8 w-8 text-primary" /> Admin Dashboard
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Global Settings */}
        <div className="space-y-6">
          <section className="bg-card rounded-lg border p-6">
            <h2 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" /> Pricing
            </h2>
            <div>
              <Label htmlFor="markup">Global Markup (%)</Label>
              <div className="flex items-center gap-3 mt-1">
                <Input
                  id="markup"
                  type="number"
                  min={0}
                  max={200}
                  value={markup}
                  onChange={(e) => setMarkup(Number(e.target.value))}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">Currently {markup}%</span>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-lg border p-6">
            <h2 className="font-heading font-bold text-lg mb-4">Category Visibility</h2>
            <div className="space-y-3">
              {categories.map((cat) => (
                <div key={cat} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{cat}</span>
                  <Switch checked={!hiddenCategories.has(cat)} onCheckedChange={() => toggleCategory(cat)} />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Product Management */}
        <div className="lg:col-span-2">
          <section className="bg-card rounded-lg border p-6">
            <h2 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" /> Products ({products.length})
            </h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {products.map((p) => {
                const overridePrice = priceOverrides[p.id];
                const displayPrice = overridePrice ? Number(overridePrice) : getAdjustedPrice(p.basePrice, 1 + markup / 100);
                return (
                  <div key={p.id} className={`flex items-center gap-4 p-3 rounded-lg border ${disabledProducts.has(p.id) ? "opacity-50 bg-muted/50" : ""}`}>
                    <img src={p.image} alt={p.title} className="w-12 h-12 rounded object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{p.title}</p>
                      <p className="text-xs text-muted-foreground">{p.category} · Base: {formatPrice(p.basePrice)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        placeholder={String(displayPrice)}
                        value={overridePrice ?? ""}
                        onChange={(e) => setPriceOverrides({ ...priceOverrides, [p.id]: e.target.value })}
                        className="w-24 text-sm"
                      />
                      <span className="text-sm font-bold text-primary w-20 text-right">{formatPrice(displayPrice)}</span>
                      <Switch checked={!disabledProducts.has(p.id)} onCheckedChange={() => toggleProduct(p.id)} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-8 text-center">
        ⚠️ Admin dashboard changes are currently frontend-only. Enable Lovable Cloud for persistence.
      </p>
    </main>
  );
};

export default Admin;
