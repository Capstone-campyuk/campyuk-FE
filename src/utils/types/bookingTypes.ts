export interface BookingTypes {
  id: number;
  ticket: string;
  camp_title: string;
  camp_image: string;
  camp_city: string;
  check_in: string;
  check_out: string;
  status: string;
  booking_date: string;
  total_price: number;
}

export interface BookingIdTypes {
  id: number;
  ticket: string;
  camp_title: string;
  camp_image: string;
  camp_city: string;
  check_in: string;
  check_out: string;
  guest: number;
  camp_cost: number;

  items: [
    {
      item_id: number;
      name: string;
      price: number;
      quantity: number;
      rent_cost: number;
    },
    {
      item_id: number;
      name: string;
      price: number;
      quantity: number;
      rent_cost: number;
    }
  ];
  total_price: number;
  booking_date: string;
  bank: string;
  virtual_number: string;
  status: string;
}
