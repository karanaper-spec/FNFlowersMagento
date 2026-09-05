import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { OrderSummary } from '@/components/order-summary';

export function Checkout({ cart }: { cart: ReturnType<typeof useCart> }) {
  const [complete, setComplete] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', state: '', zip: '', note: '', date: 'Next available date' });
  
  const shipping = cart.subtotal ? 15 : 0;
  const total = cart.subtotal + shipping;
  
  const setField = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));
  
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const required: (keyof typeof form)[] = ['name', 'email', 'address', 'city', 'state', 'zip'];
    const next: Record<string, string> = {};
    
    required.forEach((key) => { if (!form[key].trim()) next[key] = 'Required'; });
    if (form.email && !form.email.includes('@')) next.email = 'Enter a valid email';
    
    setErrors(next);
    if (!Object.keys(next).length) { 
      setComplete(true); 
      cart.clear(); 
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (complete) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center py-20 px-5 bg-background">
        <div className="max-w-2xl text-center flex flex-col items-center">
          <div className="w-24 h-24 bg-primary flex items-center justify-center rounded-full text-primary-foreground mb-10 animate-in zoom-in duration-500 shadow-xl shadow-primary/20">
            <Check size={40} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4 block">Order Confirmed</span>
          <h1 className="font-serif text-6xl md:text-8xl tracking-tight leading-[0.9] mb-8">
            Beautifully <i className="text-primary font-light">Done</i>.
          </h1>
          <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg mb-12">
            Thank you, {form.name.split(' ')[0] || 'friend'}. Your order request has been received. A confirmation will be sent to {form.email}.
          </p>
          <Link href="/" className="btn-outline" data-testid="button-back-home">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!cart.lines.length) {
    return (
      <div className="w-full py-32 flex flex-col items-center justify-center text-center px-5">
        <h2 className="font-serif text-4xl mb-6">Nothing to checkout</h2>
        <p className="font-sans text-muted-foreground mb-10">Your bag is empty. Let's add something beautiful first.</p>
        <Link href="/shop" className="btn-primary">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-background min-h-screen">
      <div className="px-5 md:px-10 py-12 max-w-[1600px] mx-auto border-b border-border bg-muted/5">
        <Link href="/cart" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors" data-testid="link-back-cart">
          <ArrowLeft size={14} /> Back to Bag
        </Link>
      </div>

      <div className="px-5 md:px-10 py-12 md:py-20 max-w-[1600px] mx-auto grid lg:grid-cols-[1fr_450px] gap-16 lg:gap-24">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Final Step</span>
          <h1 className="font-serif text-5xl md:text-7xl mt-4 tracking-tight leading-[0.9] mb-16">
            Make it <i className="text-primary font-light">Meaningful</i>.
          </h1>

          <form onSubmit={submit} className="space-y-16" noValidate>
            <section>
              <h2 className="font-serif text-3xl mb-8 flex items-baseline gap-4 border-b border-border pb-4">
                <span className="font-mono text-[10px] text-primary">01.</span> Delivery Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
                <Field label="Full Name" field="name" value={form.name} error={errors.name} onChange={setField} wide />
                <Field label="Email Address" field="email" value={form.email} error={errors.email} onChange={setField} wide />
                <Field label="Street Address" field="address" value={form.address} error={errors.address} onChange={setField} wide />
                <Field label="City" field="city" value={form.city} error={errors.city} onChange={setField} />
                <div className="grid grid-cols-2 gap-6">
                  <Field label="State" field="state" value={form.state} error={errors.state} onChange={setField} />
                  <Field label="ZIP" field="zip" value={form.zip} error={errors.zip} onChange={setField} />
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl mb-8 flex items-baseline gap-4 border-b border-border pb-4">
                <span className="font-mono text-[10px] text-primary">02.</span> The Note
              </h2>
              <div className="flex flex-col gap-3">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground flex justify-between">
                  <span>Your Message</span>
                  <span className="text-muted-foreground/60">(Optional)</span>
                </label>
                <textarea 
                  value={form.note} 
                  onChange={(e) => setField('note', e.target.value)} 
                  rows={4} 
                  placeholder="Say something nice..." 
                  className="w-full bg-muted/20 border border-border p-6 font-serif text-2xl focus:border-primary transition-colors outline-none resize-none" 
                  data-testid="input-note" 
                />
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl mb-8 flex items-baseline gap-4 border-b border-border pb-4">
                <span className="font-mono text-[10px] text-primary">03.</span> Timing
              </h2>
              <div className="flex flex-col gap-3">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground" htmlFor="delivery-date">
                  Delivery Date
                </label>
                <div className="relative">
                  <select 
                    id="delivery-date" 
                    value={form.date} 
                    onChange={(e) => setField('date', e.target.value)} 
                    className="w-full bg-muted/20 border border-border p-5 font-sans text-sm focus:border-primary transition-colors outline-none appearance-none rounded-none cursor-pointer" 
                    data-testid="select-delivery-date"
                  >
                    <option>Next available date</option>
                    <option>Tuesday, June 17</option>
                    <option>Wednesday, June 18</option>
                    <option>Thursday, June 19</option>
                    <option>Friday, June 20</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ArrowRight size={14} className="rotate-90 text-foreground" />
                  </div>
                </div>
              </div>
            </section>

            <button type="submit" className="btn-primary w-full py-6 text-sm" data-testid="button-place-order">
              Request Order <ArrowRight size={16} />
            </button>
          </form>
        </div>

        <div className="lg:sticky lg:top-32">
          <OrderSummary subtotal={cart.subtotal} shipping={shipping} total={total} checkout={false} />
        </div>
      </div>
    </div>
  );
}

function Field({ label, field, value, error, onChange, wide }: { label: string; field: string; value: string; error?: string; onChange: (field: any, value: string) => void; wide?: boolean }) {
  return (
    <div className={`flex flex-col gap-3 ${wide ? 'sm:col-span-2' : ''}`}>
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground flex justify-between">
        <span>{label}</span>
        {error && <span className="text-primary flex items-center gap-1.5"><AlertCircle size={10} /> {error}</span>}
      </label>
      <input 
        type="text"
        className={`w-full bg-transparent border-b ${error ? 'border-primary text-primary' : 'border-border focus:border-foreground text-foreground'} pb-3 font-sans text-base transition-colors outline-none rounded-none`} 
        value={value} 
        onChange={(e) => onChange(field, e.target.value)} 
        data-testid={`input-${field}`} 
        aria-invalid={!!error} 
      />
    </div>
  );
}