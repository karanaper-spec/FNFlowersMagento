import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

export function OrderSummary({ subtotal, shipping, total, checkout = true }: { subtotal: number; shipping: number; total: number; checkout?: boolean }) {
  return (
    <div className="bg-muted/30 border border-border p-8 sm:p-10">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-8 pb-4 border-b border-border">Order Details</h3>
      
      <div className="space-y-4 font-sans text-sm mb-8">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Flowers</span>
          <span className="font-mono">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Delivery</span>
          <span className="font-mono">{shipping ? `$${shipping.toFixed(2)}` : '—'}</span>
        </div>
      </div>
      
      <div className="pt-6 border-t border-border mb-8">
        <div className="flex justify-between items-end">
          <span className="font-serif text-3xl">Total</span>
          <span className="font-mono text-xl" data-testid="text-order-total">${total.toFixed(2)}</span>
        </div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-3">Taxes calculated at checkout</p>
      </div>

      {checkout && (
        <Link href="/checkout" className={`btn-primary w-full py-5 ${subtotal === 0 ? 'pointer-events-none opacity-40' : ''}`} data-testid="button-checkout">
          Proceed to Checkout <ArrowRight size={14} />
        </Link>
      )}
      
      <div className="mt-8 text-center font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
        White-glove delivery across the US
      </div>
    </div>
  );
}