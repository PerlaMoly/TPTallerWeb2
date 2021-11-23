import { Detalle } from './detalle.entity';

export const carritoProviders = [
  {
    provide: 'DETALLE_REPOSITORY',
    useValue: Detalle,
  },
];
