import { Carrito } from './carrito.entity';

export const carritoProviders = [
  {
    provide: 'CARRITO_REPOSITORY',
    useValue: Carrito,
  },
];
