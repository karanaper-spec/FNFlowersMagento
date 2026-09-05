import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Sparkles, ShoppingBag, X, Menu } from 'lucide-react';
import { useCart } from '@/lib/cart';

export function Layout({ children, cart }: { children: ReactNode; cart: ReturnType<typeof useCart> }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [['/shop', 'Shop'], ['/about', 'About'], ['/contact', 'Contact']];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="px-5 md:px-10 h-20 flex items-center justify-between max-w-[1600px] mx-auto w-full">
          <Link href="/" className="group flex items-center gap-3" data-testid="link-logo">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background group-hover:bg-primary transition-colors">
              <Sparkles size={14} strokeWidth={1.5} />
            </span>
            <span className="font-serif text-2xl tracking-tight mt-1">FNFlowers</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-10" aria-label="Primary navigation">
            {links.map(([href, label]) => (
              <Link key={href} href={href} className={`text-[10px] font-mono uppercase tracking-[0.2em] hover:text-primary transition-colors ${location === href ? 'text-primary' : 'text-foreground'}`} data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <Link href="/cart" className="group flex items-center gap-3 hover:text-primary transition-colors" data-testid="link-cart">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] hidden sm:block">Cart</span>
              <div className="relative">
                <ShoppingBag size={20} strokeWidth={1.2} />
                <span className="absolute -bottom-2 -right-2 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-mono text-primary-foreground">
                  {cart.itemCount}
                </span>
              </div>
            </Link>
            <button className="md:hidden text-foreground hover:text-primary transition-colors" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" data-testid="button-toggle-menu">
              {menuOpen ? <X size={24} strokeWidth={1.2} /> : <Menu size={24} strokeWidth={1.2} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="absolute top-20 left-0 right-0 border-b border-border bg-background p-6 md:hidden flex flex-col gap-6 animate-in slide-in-from-top-4" aria-label="Mobile navigation">
            {links.map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="font-serif text-4xl hover:text-primary transition-colors" data-testid={`link-mobile-${label.toLowerCase().replaceAll(' ', '-')}`}>
                {label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <footer className="mt-auto border-t border-border bg-foreground text-background pt-20 pb-10 px-5 md:px-10">
        <div className="max-w-[1600px] mx-auto w-full grid gap-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-md">
            <h2 className="font-serif text-6xl md:text-8xl leading-[0.85] tracking-tight">Send<br/><i className="font-light text-primary">something</i><br/>lovely.</h2>
            <p className="mt-8 font-sans text-sm leading-relaxed text-muted-foreground max-w-sm">
              Distinctive, artfully selected blooms for the moments you want to make a little more memorable.
            </p>
          </div>
          
          <div className="flex flex-col gap-6">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Explore</h3>
            <div className="flex flex-col gap-4 font-sans text-sm">
              <Link href="/shop" className="hover:text-primary transition-colors w-fit" data-testid="link-footer-shop">Shop the collection</Link>
              <Link href="/about" className="hover:text-primary transition-colors w-fit" data-testid="link-footer-about">Our point of view</Link>
              <Link href="/contact" className="hover:text-primary transition-colors w-fit" data-testid="link-footer-contact">Contact & care</Link>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Details</h3>
            <div className="flex flex-col gap-4 font-sans text-sm text-muted-foreground">
              <span>Delivered Tuesday–Saturday</span>
              <span>Wrapped by hand in New York</span>
              <span>Always seasonal, never standard</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Contact</h3>
            <div className="flex flex-col gap-4 font-sans text-sm text-muted-foreground">
              <Link href="/contact" className="hover:text-primary transition-colors">Customer care</Link>
              <span>Mon–Fri, 9am–5pm ET</span>
            </div>
            <button className="mt-auto w-fit font-mono text-[10px] uppercase tracking-[0.2em] text-background border-b border-background pb-1 hover:text-primary hover:border-primary transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-testid="button-footer-top">
              Back to top
            </button>
          </div>
        </div>
        
        <div className="max-w-[1600px] mx-auto w-full mt-24 pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>© {new Date().getFullYear()} FNFlowers LLC</span>
          <span>New York · United States</span>
        </div>
      </footer>
    </div>
  );
}