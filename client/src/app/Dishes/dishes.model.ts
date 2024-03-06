export interface Comment {
  rating: number;
  comment: string;
  author: string;
  timestamps?: Date;
}

export interface Disc {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
  feature: boolean;
  label: string;
  comments: Comment[];
  timestamps: Date;
}

export interface DishesData {
  status: string;
  data: Disc[];
}
