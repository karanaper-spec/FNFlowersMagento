import { Link } from 'wouter';
import { ArrowRight, Sparkles } from 'lucide-react';
import { products } from '@/lib/data';
import { useCart } from '@/lib/cart';
import { ProductCard } from '@/components/product-card';

export function Home({ cart }: { cart: ReturnType<typeof useCart> }) {
  const featured = products.slice(0, 4);
  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center border-b border-border bg-background">
        <div className="absolute inset-0 z-0 flex flex-col md:flex-row">
          <div className="flex-1 bg-background hidden md:block"></div>
          <div className="flex-1 image-hover-wrapper h-full">
            <img src="/flowers/market-color.jpg" alt="Editorial flower arrangement" className="object-cover w-full h-full object-center" />
          </div>
        </div>
        
        <div className="px-5 md:px-10 max-w-[1600px] mx-auto w-full z-10 relative">
          <div className="max-w-2xl bg-background/95 backdrop-blur-md p-8 md:p-12 lg:p-16 border border-border">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary flex items-center gap-3 mb-6">
              <Sparkles size={12} /> The New Collection
            </span>
            <h1 className="font-serif text-6xl md:text-8xl leading-[0.9] tracking-tight mb-8">
              Artfully <br/>
              <i className="font-light text-primary">Unruly</i> <br/>
              Stems.
            </h1>
            <p className="font-sans text-sm md:text-base leading-relaxed text-muted-foreground mb-10 max-w-md">
              Distinctive, farm-fresh flowers arranged with an editorial eye. For the moments that deserve more than just a gesture.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="btn-primary" data-testid="button-shop-collection">
                Shop Flowers <ArrowRight size={14} />
              </Link>
              <Link href="/about" className="btn-outline" data-testid="button-our-story">
                Our Approach
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-b border-border bg-foreground text-background py-4 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee font-mono text-[10px] uppercase tracking-[0.2em] flex gap-12 items-center">
          <span>Always fresh</span> <Sparkles size={12} className="text-primary"/>
          <span>Never predictable</span> <Sparkles size={12} className="text-primary"/>
          <span>Delivered with care</span> <Sparkles size={12} className="text-primary"/>
          <span>Hand-written notes</span> <Sparkles size={12} className="text-primary"/>
          <span>Always fresh</span> <Sparkles size={12} className="text-primary"/>
          <span>Never predictable</span> <Sparkles size={12} className="text-primary"/>
          <span>Delivered with care</span> <Sparkles size={12} className="text-primary"/>
          <span>Hand-written notes</span> <Sparkles size={12} className="text-primary"/>
          <span>Always fresh</span> <Sparkles size={12} className="text-primary"/>
          <span>Never predictable</span> <Sparkles size={12} className="text-primary"/>
        </div>
      </div>

      {/* Featured Products */}
      <section className="py-24 md:py-32 px-5 md:px-10 border-b border-border bg-background">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Curated Selection</span>
              <h2 className="font-serif text-5xl md:text-7xl mt-4 tracking-tight">Current <i className="text-primary font-light">Favorites</i>.</h2>
            </div>
            <Link href="/shop" className="btn-text" data-testid="link-view-all">
              View all flowers <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {featured.map(product => (
              <ProductCard key={product.slug} product={product} cart={cart} />
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-24 md:py-32 px-5 md:px-10 border-b border-border bg-muted/30">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="image-hover-wrapper aspect-[4/5] max-w-xl mx-auto w-full">
            <img src="/flowers/white-lilies.jpg" alt="White lilies up close" />
          </div>
          <div className="max-w-xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Our Philosophy</span>
            <h2 className="font-serif text-5xl md:text-7xl tracking-tight leading-[0.9] mt-6 mb-8">
              A rebellion <br/> against the <br/> <i className="text-primary font-light">ordinary</i>.
            </h2>
            <div className="space-y-6 font-sans text-muted-foreground text-sm md:text-base leading-relaxed">
              <p>
                We believe flowers shouldn't look like they were born in a factory. Our arrangements celebrate the organic, slightly wild nature of real stems. 
              </p>
              <p>
                Every bouquet is a study in texture, color, and negative space. We source the most interesting varietals we can find and let them do what they do best: breathe life into a room.
              </p>
            </div>
            <div className="mt-12">
              <Link href="/about" className="btn-outline" data-testid="button-read-manifesto">
                Read our manifesto
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}