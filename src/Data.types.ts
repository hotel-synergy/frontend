export interface foodMenuCategoryType {
  name: string;
  description: string;
  items: string;
  _id: string;
}

export interface foodMenuItemType {
  _id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}
