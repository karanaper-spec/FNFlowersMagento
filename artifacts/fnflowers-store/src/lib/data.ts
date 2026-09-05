export type Category = 'Everyday' | 'Celebration' | 'Just because' | 'Seasonal';

export type Product = {
  slug: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  details: string;
  image: string;
  colors: string;
  size: string;
  badge?: string;
};

export const products: Product[] = [
  {
    slug: 'the-sunday',
    name: 'The Sunday',
    price: 88,
    category: 'Everyday',
    description: 'An easy, sunlit arrangement for the days worth lingering over.',
    details: 'A generous mix of warm ranunculus, tulips, seasonal foliage, and whatever else is looking especially good at the market.',
    image: '/flowers/market-color.jpg',
    colors: 'Marigold, coral, leaf',
    size: 'Medium · 16–18 stems',
    badge: 'Our signature',
  },
  {
    slug: 'soft-launch',
    name: 'Soft Launch',
    price: 76,
    category: 'Just because',
    description: 'A little blush, a little citrus, and a very good reason to send it.',
    details: 'Peach garden roses and blush tulips make a thoughtful, unfussy gesture that feels just right.',
    image: '/flowers/pastel-roses.jpg',
    colors: 'Peach, blush, pale yellow',
    size: 'Small · 12–14 stems',
  },
  {
    slug: 'after-hours',
    name: 'After Hours',
    price: 112,
    category: 'Celebration',
    description: 'Deep jewel tones for a toast, a milestone, or a night to remember.',
    details: 'Indigo delphinium, burgundy dahlias, white cosmos, and hand-gathered accents in a cobalt glass vessel.',
    image: '/flowers/purple-lisianthus.jpg',
    colors: 'Indigo, wine, cloud',
    size: 'Large · 20–24 stems',
    badge: 'Best seller',
  },
  {
    slug: 'good-news',
    name: 'Good News',
    price: 94,
    category: 'Celebration',
    description: 'Bright, buoyant, and made for putting a grin on someone’s face.',
    details: 'A cheerful, textural mix of coral ranunculus, butter tulips, chamomile, and airy greens.',
    image: '/flowers/wildflower-hand.jpg',
    colors: 'Coral, butter, soft green',
    size: 'Medium · 16–18 stems',
  },
  {
    slug: 'the-greenroom',
    name: 'The Greenroom',
    price: 68,
    category: 'Everyday',
    description: 'A leafy, sculptural arrangement for a desk, shelf, or new beginning.',
    details: 'Glossy foliage, delicate white blooms, and textural stems with a quiet, architectural point of view.',
    image: '/flowers/neutral-bouquet.jpg',
    colors: 'Fern, cream, olive',
    size: 'Small · 10–12 stems',
  },
  {
    slug: 'late-summer',
    name: 'Late Summer',
    price: 105,
    category: 'Seasonal',
    description: 'A little wild, a little golden — the season at its most generous.',
    details: 'Seasonal sunflowers, cosmos, zinnias, and ornamental grasses wrapped in our signature paper.',
    image: '/flowers/sunflower-tall.jpg',
    colors: 'Terracotta, straw, goldenrod',
    size: 'Large · 22–26 stems',
    badge: 'Seasonal',
  },
  {
    slug: 'the-classic',
    name: 'The Classic',
    price: 130,
    category: 'Celebration',
    description: 'A timeless statement of affection that never feels overdone.',
    details: 'Lush, reflexed roses mixed with delicate textural elements for a modern take on romance.',
    image: '/flowers/florist-roses.jpg',
    colors: 'Crimson, blush, deep green',
    size: 'Large · 24–30 stems',
  },
  {
    slug: 'first-light',
    name: 'First Light',
    price: 82,
    category: 'Just because',
    description: 'Crisp and awakening, like early mornings in a quiet house.',
    details: 'White roses and elegant tulips combine for a minimalist, serene composition.',
    image: '/flowers/white-rose-tulip.jpg',
    colors: 'Cream, snow, pale lime',
    size: 'Medium · 14–16 stems',
  },
  {
    slug: 'spring-awakening',
    name: 'Spring Awakening',
    price: 78,
    category: 'Seasonal',
    description: 'The first real signs of warmth, gathered loosely together.',
    details: 'Vibrant pink tulips that will continue to grow and dance in their vase over time.',
    image: '/flowers/pink-tulips.jpg',
    colors: 'Magenta, soft pink, spring green',
    size: 'Medium · 18–20 stems',
  },
  {
    slug: 'velvet-underground',
    name: 'Velvet Underground',
    price: 115,
    category: 'Celebration',
    description: 'Rich, intoxicating, and unapologetically dramatic.',
    details: 'Deep red garden blooms that feel like a secret shared between friends.',
    image: '/flowers/garden-red.jpg',
    colors: 'Oxblood, crimson, dark foliage',
    size: 'Large · 20–24 stems',
  },
  {
    slug: 'pure-intentions',
    name: 'Pure Intentions',
    price: 90,
    category: 'Everyday',
    description: 'Strikingly simple and incredibly fragrant.',
    details: 'Pristine white lilies that command attention without shouting.',
    image: '/flowers/white-lilies.jpg',
    colors: 'Alabaster, yellow stamen, emerald',
    size: 'Medium · 6–8 large stems',
  },
  {
    slug: 'field-notes',
    name: 'Field Notes',
    price: 72,
    category: 'Just because',
    description: 'As if you wandered through a meadow and couldn’t help yourself.',
    details: 'A scattered, airy collection of wildflowers and delicate stems that feels wonderfully unstyled.',
    image: '/flowers/summer-wild.jpg',
    colors: 'Lavender, white, wild green',
    size: 'Small · 14–18 stems',
  }
];