import { useState, useEffect } from 'react';
import { products, Product } from './data';

export type CartLine = { slug: string; quantity: number };

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('fnflowers-cart') || '[]') as CartLine[];
    } catch {
      return [];
    }
  });

  useEffect(() => localStorage.setItem('fnflowers-cart', JSON.stringify(lines)), [lines]);

  const add = (slug: string) => setLines((current) => {
    const found = current.find((line) => line.slug === slug);
    return found
      ? current.map((line) => line.slug === slug ? { ...line, quantity: line.quantity + 1 } : line)
      : [...current, { slug, quantity: 1 }];
  });

  const update = (slug: string, quantity: number) => setLines((current) => 
    quantity < 1 ? current.filter((line) => line.slug !== slug) : current.map((line) => line.slug === slug ? { ...line, quantity } : line)
  );

  const clear = () => setLines([]);

  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const getProduct = (slug: string) => products.find(p => p.slug === slug);
  const subtotal = lines.reduce((sum, line) => sum + (getProduct(line.slug)?.price || 0) * line.quantity, 0);

  return { lines, add, update, clear, itemCount, subtotal, getProduct };
}