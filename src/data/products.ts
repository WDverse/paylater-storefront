export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 'wireless-headphones',
    name: 'Wireless Headphones',
    price: 129.99,
    image: 'https://placehold.co/300x200',
  },
  {
    id: 'game-controllers',
    name: 'Game Controllers',
    price: 49.5,
    image: 'https://placehold.co/300x200',
  },
  {
    id: 'smart-watch',
    name: 'Smart Watch',
    price: 499.0,
    image: 'https://placehold.co/300x200',
  },
];
