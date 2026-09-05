import { Link } from 'wouter';

export function Contact() {
  return (
    <div className="w-full bg-background">
      <div className="px-5 md:px-10 py-16 md:py-24 border-b border-border bg-muted/10">
        <div className="max-w-[1600px] mx-auto max-w-4xl text-center flex flex-col items-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-6">Get in Touch</span>
          <h1 className="font-serif text-6xl md:text-8xl tracking-tight leading-[0.9] mb-10">
            Say <i className="text-primary font-light">Hello</i>.
          </h1>
          <p className="font-sans text-lg text-muted-foreground leading-relaxed max-w-xl">
            Have a question about an order, or need advice on how to care for your new blooms? We're here to help.
          </p>
        </div>
      </div>

      <div className="px-5 md:px-10 py-24 max-w-[1600px] mx-auto grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-32">
        <div className="space-y-16">
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6">Customer Care</h3>
            <p className="font-serif text-4xl mb-4">Send us a message</p>
            <p className="font-sans text-sm text-muted-foreground">Mon–Fri, 9am–5pm ET</p>
          </div>
          <div className="border-t border-border pt-16">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6">Delivery</h3>
            <p className="font-serif text-4xl mb-4 leading-snug">New York<br/>Tuesday–Saturday</p>
            <p className="font-sans text-sm text-muted-foreground">Scheduled delivery windows available</p>
          </div>
        </div>

        <div className="bg-muted/10 border border-border p-8 sm:p-12 md:p-16">
          <h2 className="font-serif text-4xl mb-10">Send a Message</h2>
          <form className="space-y-10">
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Name</label>
                <input type="text" className="w-full bg-transparent border-b border-border pb-3 font-sans text-base focus:border-foreground transition-colors outline-none rounded-none" />
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Email</label>
                <input type="email" className="w-full bg-transparent border-b border-border pb-3 font-sans text-base focus:border-foreground transition-colors outline-none rounded-none" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Message</label>
              <textarea rows={5} className="w-full bg-transparent border-b border-border pb-3 font-sans text-base focus:border-foreground transition-colors outline-none resize-none rounded-none"></textarea>
            </div>
            <button type="button" className="btn-primary w-full sm:w-auto py-5 px-10">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}