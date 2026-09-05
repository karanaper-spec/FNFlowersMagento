import { useState } from 'react';
import { Link } from 'wouter';
import { Check, Plus } from 'lucide-react';
import { Product } from '@/lib/data';
import { useCart } from '@/lib/cart';

export function ProductCard({ product, cart }: { product: Product, cart: ReturnType<typeof useCart> }) {
  const [added, setAdded] = useState(false);
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cart.add(product.slug);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link href={`/product/${product.slug}`} className="product-card group" data-testid={`card-product-${product.slug}`}>
      <div className="image-hover-wrapper aspect-[3/4] bg-muted mb-6 relative">
        <img src={product.image} alt={product.name} />
        {product.badge && (
          <span className="absolute top-4 left-4 bg-background text-foreground font-mono text-[9px] uppercase tracking-widest py-1.5 px-3 z-10">
            {product.badge}
          </span>
        )}
        <div className="add-to-cart-bar z-10">
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-semibold">
            {added ? 'Added to Bag' : 'Quick Add'}
          </span>
          <button onClick={handleAdd} className="w-8 h-8 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors" data-testid={`button-add-${product.slug}`}>
            {added ? <Check size={14} /> : <Plus size={14} />}
          </button>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-serif text-2xl md:text-3xl group-hover:text-primary transition-colors">{product.name}</h3>
          <p className="font-sans text-xs text-muted-foreground mt-2">{product.category}</p>
        </div>
        <span className="font-mono text-sm">${product.price}</span>
      </div>
    </Link>
  );
}