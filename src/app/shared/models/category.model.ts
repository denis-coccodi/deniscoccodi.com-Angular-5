import { Occurrence } from './occurrence.model';

export class Category {
  constructor(
    public categoryName: string,
    public categoryDesc: string,
    public occurrences: Occurrence[]
  ) {}
}
