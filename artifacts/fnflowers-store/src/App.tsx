import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ErrorBoundary } from '@/components/error-boundary';

import { useCart } from '@/lib/cart';
import { Layout } from '@/components/layout';

import { Home } from '@/pages/home';
import { Shop } from '@/pages/shop';
import { Product } from '@/pages/product';
import { Cart } from '@/pages/cart';
import { Checkout } from '@/pages/checkout';
import { About } from '@/pages/about';
import { Contact } from '@/pages/contact';
import NotFound from '@/pages/not-found';

export default function App() {
  const cart = useCart();

  return (
    <WouterRouter>
      <ErrorBoundary>
        <TooltipProvider>
          <Layout cart={cart}>
            <Switch>
              <Route path="/"><Home cart={cart} /></Route>
              <Route path="/shop"><Shop cart={cart} /></Route>
              <Route path="/product/:slug"><Product cart={cart} /></Route>
              <Route path="/cart"><Cart cart={cart} /></Route>
              <Route path="/checkout"><Checkout cart={cart} /></Route>
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
          <Toaster />
        </TooltipProvider>
      </ErrorBoundary>
    </WouterRouter>
  );
}