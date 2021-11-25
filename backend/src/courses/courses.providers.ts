import { Course } from './courses.entity';

export const coursesProviders = [
  {
    provide: 'COURSES_REPOSITORY',
    useValue: Course,
  },
];
