import { Certificate } from './certificate.model';
import { Image } from './image.model';

export class Occurrence {
  constructor(
    public id: string,
    public startDate: Date,
    public endDate: Date,
    public attachedFile: string,
    public title: string,
    public score: string,
    public company: string,
    public location: string,
    public description: string,
    public addToCv: number,
    public certificates: Certificate[],
    public images: Image[]
  ) {}
}
