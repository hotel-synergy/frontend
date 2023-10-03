import { useEffect, useState } from "react";
import { foodMenuCategoryType, foodMenuItemType } from "../../Data.types";

interface foodSearchProps {
  category: foodMenuCategoryType[];
  menu: foodMenuItemType[];
}

function FoodSearch({ category, menu }: foodSearchProps) {
  const [showSearch, setShowSearch] = useState(true);

  useEffect(() => {
    if (category.length === 0 && menu.length === 0) {
      setShowSearch(false);
    }
  });
  return (
    <>
      {!showSearch && (
        <>
          <p>There are no categories and menu items to search.</p>
        </>
      )}
    </>
  );
}

export default FoodSearch;
