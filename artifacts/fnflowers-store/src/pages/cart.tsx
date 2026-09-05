import { Link } from 'wouter';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { OrderSummary } from '@/components/order-summary';

export function Cart({ cart }: { cart: ReturnType<typeof useCart> }) {
  const shipping = cart.subtotal > 0 ? 15 : 0;
  const total = cart.subtotal + shipping;

  return (
    <div className="w-full bg-background min-h-screen">
      <div className="px-5 md:px-10 py-16 md:py-24 border-b border-border bg-muted/10">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Your Selection</span>
            <h1 className="font-serif text-6xl md:text-8xl mt-4 tracking-tight leading-[0.9]">
              The <i className="text-primary font-light">Bag</i>.
            </h1>
          </div>
          {cart.itemCount > 0 && (
            <button onClick={cart.clear} className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-muted-foreground pb-1 hover:text-foreground hover:border-foreground transition-colors" data-testid="button-clear-cart">
              Empty Bag
            </button>
          )}
        </div>
      </div>

      <div className="px-5 md:px-10 py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto">
          {cart.lines.length === 0 ? (
            <div className="min-h-[40vh] flex flex-col items-center justify-center border border-dashed border-border py-20 text-center bg-muted/5">
              <span className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                <X size={24} />
              </span>
              <h2 className="font-serif text-4xl mb-4">Your bag is empty</h2>
              <p className="font-sans text-muted-foreground text-sm max-w-md mb-8">It seems you haven't added any flowers yet. Let's find something beautiful.</p>
              <Link href="/shop" className="btn-outline" data-testid="link-empty-shop">
                Explore the collection
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_450px] gap-16 lg:gap-24 items-start">
              <div className="flex flex-col gap-10">
                {cart.lines.map((line) => {
                  const product = cart.getProduct(line.slug);
                  if (!product) return null;
                  return (
                    <div key={line.slug} className="flex flex-col sm:flex-row gap-6 sm:gap-10 pb-10 border-b border-border last:border-0 last:pb-0" data-testid={`row-cart-${line.slug}`}>
                      <Link href={`/product/${product.slug}`} className="w-full sm:w-40 aspect-[3/4] bg-muted image-hover-wrapper block shrink-0 border border-border">
                        <img src={product.image} alt={product.name} />
                      </Link>
                      <div className="flex-1 flex flex-col justify-between py-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                          <div>
                            <Link href={`/product/${product.slug}`} className="font-serif text-3xl sm:text-4xl hover:text-primary transition-colors" data-testid={`link-cart-product-${product.slug}`}>
                              {product.name}
                            </Link>
                            <p className="font-sans text-sm text-muted-foreground mt-3">{product.size}</p>
                          </div>
                          <span className="font-mono text-xl">${product.price * line.quantity}</span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-8">
                          <div className="flex items-center border border-border">
                            <button onClick={() => cart.update(line.slug, line.quantity - 1)} className="p-3 hover:text-primary transition-colors" aria-label={`Decrease ${product.name}`} data-testid={`button-cart-decrease-${product.slug}`}><Minus size={14} /></button>
                            <span className="w-10 text-center font-mono text-sm">{line.quantity}</span>
                            <button onClick={() => cart.update(line.slug, line.quantity + 1)} className="p-3 hover:text-primary transition-colors" aria-label={`Increase ${product.name}`} data-testid={`button-cart-increase-${product.slug}`}><Plus size={14} /></button>
                          </div>
                          <button onClick={() => cart.update(line.slug, 0)} className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1" data-testid={`button-remove-${product.slug}`}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="lg:sticky lg:top-32">
                <OrderSummary subtotal={cart.subtotal} shipping={shipping} total={total} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}