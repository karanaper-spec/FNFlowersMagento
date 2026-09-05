import { useState } from 'react';
import { useParams, Link } from 'wouter';
import { Check, ArrowLeft, ArrowRight, Minus, Plus } from 'lucide-react';
import { products } from '@/lib/data';
import { useCart } from '@/lib/cart';
import NotFound from './not-found';

export function Product({ cart }: { cart: ReturnType<typeof useCart> }) {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find(p => p.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return <NotFound />;

  const addProduct = () => { 
    for (let i = 0; i < quantity; i++) cart.add(product.slug); 
    setAdded(true); 
    setTimeout(() => setAdded(false), 2000); 
  };

  return (
    <div className="w-full bg-background min-h-screen">
      <div className="px-5 md:px-10 max-w-[1600px] mx-auto py-8">
        <Link href="/shop" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors" data-testid="link-back-shop">
          <ArrowLeft size={14} /> Back to Collection
        </Link>
      </div>

      <div className="px-5 md:px-10 max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-start pb-24">
        {/* Image Column */}
        <div className="relative image-hover-wrapper aspect-[3/4] bg-muted w-full lg:sticky lg:top-32">
          <img src={product.image} alt={product.name} />
          {product.badge && (
            <span className="absolute top-6 left-6 bg-background text-foreground font-mono text-[10px] uppercase tracking-widest py-2 px-4 z-10 border border-border">
              {product.badge}
            </span>
          )}
        </div>

        {/* Content Column */}
        <div className="py-2 lg:py-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{product.category}</span>
          </div>
          
          <h1 className="font-serif text-6xl md:text-8xl tracking-tight leading-[0.9] mb-8">{product.name}</h1>
          <p className="font-serif text-3xl md:text-4xl text-foreground/90 leading-snug mb-8">{product.description}</p>
          <p className="font-sans text-sm md:text-base leading-relaxed text-muted-foreground mb-12 max-w-xl">{product.details}</p>

          <div className="grid grid-cols-2 gap-8 border-y border-border py-8 mb-12">
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Palette</h3>
              <p className="font-sans text-sm text-foreground">{product.colors}</p>
            </div>
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Scale</h3>
              <p className="font-sans text-sm text-foreground">{product.size}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-12">
            <span className="font-mono text-3xl">${product.price}</span>
            <div className="flex items-center border border-border bg-background">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-4 hover:text-primary transition-colors" aria-label="Decrease quantity" data-testid="button-decrease-quantity"><Minus size={14} /></button>
              <span className="w-12 text-center font-mono text-sm" data-testid="text-product-quantity">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-4 hover:text-primary transition-colors" aria-label="Increase quantity" data-testid="button-increase-quantity"><Plus size={14} /></button>
            </div>
            <button onClick={addProduct} className="btn-primary flex-1 sm:flex-none py-4" data-testid="button-product-add">
              {added ? <><Check size={14} /> Added to Bag</> : <>Add to Bag <ArrowRight size={14} /></>}
            </button>
          </div>

          <div className="bg-muted/30 border border-border p-8 font-sans text-sm text-muted-foreground leading-relaxed">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary block mb-3">Note</span>
            Every arrangement is a unique composition. While we follow the palette and spirit of the design, specific stems may vary based on what's best at the market today.
          </div>
        </div>
      </div>
    </div>
  );
}