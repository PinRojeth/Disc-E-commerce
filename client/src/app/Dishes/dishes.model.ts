export interface Comment {
  rating: number;
  comment: string;
  author: string;
  createdAt: Date;
}

export interface Disc {
  data: any;
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
