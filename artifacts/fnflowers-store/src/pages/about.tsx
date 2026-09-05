import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

export function About() {
  return (
    <div className="w-full bg-background">
      <div className="px-5 md:px-10 py-16 md:py-24 border-b border-border bg-muted/10">
        <div className="max-w-[1600px] mx-auto max-w-4xl text-center flex flex-col items-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-6">Our Viewpoint</span>
          <h1 className="font-serif text-6xl md:text-8xl tracking-tight leading-[0.9] mb-10">
            Let the stems <br/><i className="text-primary font-light">speak</i>.
          </h1>
          <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed">
            We started FNFlowers because we were tired of receiving stiff, symmetrical bouquets that looked like they belonged in a corporate lobby. We wanted flowers that felt like they were gathered from a garden on a slow Sunday morning.
          </p>
        </div>
      </div>

      <div className="px-5 md:px-10 py-24 max-w-[1600px] mx-auto grid md:grid-cols-2 gap-16 lg:gap-32 items-center">
        <div className="image-hover-wrapper aspect-[3/4] w-full border border-border">
          <img src="/flowers/florist-roses.jpg" alt="Florist working with roses" />
        </div>
        <div className="space-y-16">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4 block">01.</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Sourced with Intent</h2>
            <p className="font-sans text-muted-foreground leading-relaxed text-sm md:text-base">
              Our mornings start before dawn at the local flower markets. We don't buy from a set list; we buy what looks extraordinary that day. If the ranunculus are looking sad, we skip them. If the hellebores are showing off, we take them all.
            </p>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4 block">02.</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Designed to Breathe</h2>
            <p className="font-sans text-muted-foreground leading-relaxed text-sm md:text-base">
              We arrange our blooms to give each stem space to open and change over time. Our aesthetic is loose, textural, and highly dependent on negative space. It's an approach borrowed from editorial styling and applied to everyday deliveries.
            </p>
          </div>
          <Link href="/shop" className="btn-text mt-8 inline-flex">
            Explore our arrangements <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}