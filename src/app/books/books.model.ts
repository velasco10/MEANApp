export interface Books {
  id: string;
  title: string;
  description: string;
  price: number;
  publicationDate?: Date;
  autor: {
    id:string,
    completeName:string
  };
}
