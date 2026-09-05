import { useState, useMemo } from 'react';
import { products, Category } from '@/lib/data';
import { useCart } from '@/lib/cart';
import { ProductCard } from '@/components/product-card';

export function Shop({ cart }: { cart: ReturnType<typeof useCart> }) {
  const [category, setCategory] = useState<'All' | Category>('All');
  const [sort, setSort] = useState('Featured');
  
  const filtered = useMemo(() => {
    const result = category === 'All' ? [...products] : products.filter((p) => p.category === category);
    return sort === 'Price: low to high' ? result.sort((a, b) => a.price - b.price) : sort === 'Price: high to low' ? result.sort((a, b) => b.price - a.price) : result;
  }, [category, sort]);

  return (
    <div className="w-full">
      <div className="px-5 md:px-10 py-16 md:py-24 border-b border-border bg-muted/20">
        <div className="max-w-[1600px] mx-auto">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">The Collection</span>
          <h1 className="font-serif text-6xl md:text-8xl mt-4 tracking-tight leading-[0.9] max-w-3xl">
            Choose Your <br/><i className="text-primary font-light">Palette</i>.
          </h1>
        </div>
      </div>

      <div className="border-b border-border sticky top-20 z-40 bg-background/95 backdrop-blur-sm">
        <div className="px-5 md:px-10 max-w-[1600px] mx-auto py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {(['All', 'Everyday', 'Celebration', 'Just because', 'Seasonal'] as const).map((item) => (
              <button 
                key={item} 
                onClick={() => setCategory(item)} 
                className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-colors pb-1 border-b ${category === item ? 'text-primary border-primary' : 'text-muted-foreground border-transparent hover:text-foreground'}`}
                data-testid={`button-filter-${item.toLowerCase().replaceAll(' ', '-')}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Sort</span>
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)} 
              className="bg-transparent font-mono text-[10px] uppercase tracking-[0.2em] text-foreground border-b border-foreground pb-1 cursor-pointer outline-none"
              data-testid="select-sort"
            >
              <option>Featured</option>
              <option>Price: low to high</option>
              <option>Price: high to low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-10 py-16 md:py-24 bg-background">
        <div className="max-w-[1600px] mx-auto">
          {filtered.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {filtered.map(product => (
                <ProductCard key={product.slug} product={product} cart={cart} />
              ))}
            </div>
          ) : (
            <div className="min-h-[40vh] flex flex-col items-center justify-center text-center">
              <h2 className="font-serif text-4xl mb-4">Nothing to show</h2>
              <p className="font-sans text-muted-foreground text-sm">Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}