export interface CampsTypes {
  id: number;
  verification_status: string;
  host_name: string;
  title: string;
  price: number;
  city: string;
  distance: number;
  image: string;
}

export interface CampTypes {

  id?: number;
  verification_status?: string;
  host_name?: string;
  title?: string;
  price?: number;
  document?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  city?: string;
  distance?: number;
  images?: ImageTypes[];
  items?: ItemTypes[];
}

export interface ItemTypes {
  item_id?: number;
  name?: string;
  stock?: number;
  rent_price?: number;
  item_image?: string;
}

export interface ImageTypes {
  image?: string;
  image_id?: number;

}
