import { Image } from '../models/image.model';

export class ImageSet {
  constructor(
    public desc: string,
    public images: Image[]
  ) {}
}
