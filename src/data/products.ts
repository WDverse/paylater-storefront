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
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  },
  {
    id: 'game-controllers',
    name: 'Game Controllers',
    price: 49.5,
    image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  },
  {
    id: 'smart-watch',
    name: 'Smart Watch',
    price: 499.0,
    image: 'https://images.unsplash.com/photo-1624096104992-9b4fa3a279dd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  },
];
