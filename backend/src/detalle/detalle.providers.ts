import { Detalle } from './detalle.entity';

export const detalleProviders = [
  {
    provide: 'DETALLE_REPOSITORY',
    useValue: Detalle,
  },
];
