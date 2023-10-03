import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Style from "../../styles/frontdeskfoodmenu.module.css";
import NetworkError from "../../components/NetworkError";
import FoodMenu from "../../components/Frontdesk_Restaurant/FoodMenu";
import FoodCategoryList from "../../components/Frontdesk_Restaurant/FoodCategoryList";
import AddFoodCategory from "../../components/Frontdesk_Restaurant/AddFoodCategory";
import AddFoodMenu from "../../components/Frontdesk_Restaurant/AddFoodMenu";
import FoodSearch from "../../components/Frontdesk_Restaurant/FoodSearch";
import { foodMenuCategoryType, foodMenuItemType } from "../../Data.types";

function RestaurantMenu() {
  const [loading, setLoading] = useState(true);
  const [showNetworkError, setShowNetworkError] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("Food Menu");
  const [foodMenu, setFoodMenu] = useState<foodMenuItemType[]>([]);
  const [categoryList, setCategoryList] = useState<foodMenuCategoryType[]>([]);

  /*

    TODO: things to do for this page:
    1. Load the menu and the menu categories.✅
    2. Display both the menu and the categories in different sections.✅
    3. Have sections for adding new menu and categories. ✅
    4. Have sections for deleting and updating any menu or categories. ⚒️

  */

  //Let's first load the menu list
  const loadMenu = async () => {
    const request = await fetch(
      import.meta.env.VITE_API_URL + "frontdesk/menu"
    );
    if (request.status === 200) {
      const data = await request.json();
      setFoodMenu(data.menu);
    }
  };

  //Let's load the category data
  const loadCategoryList = async () => {
    const request = await fetch(
      import.meta.env.VITE_API_URL + "frontdesk/menu/category"
    );

    if (request.ok) {
      const data = await request.json();
      setCategoryList(data.list);
    }
  };

  useEffect(() => {
    Promise.all([loadCategoryList(), loadMenu()])
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setShowNetworkError(true);
      });
  }, []);

  const screens = [
    "Food Menu",
    "Categories",
    "Add Category",
    "Add Menu",
    "Search",
  ];

  return (
    <>
      {loading && <Loading />}
      {showNetworkError && <NetworkError />}
      <ul className={Style.header}>
        {screens.map((menu) => (
          <li
            key={menu}
            onClick={() => setCurrentScreen(menu)}
            className={
              currentScreen === menu
                ? `${Style.headerButton} ${Style.active}`
                : `${Style.headerButton}`
            }
          >
            {menu}
          </li>
        ))}
      </ul>
      {currentScreen == "Food Menu" && <FoodMenu foodList={foodMenu} />}
      {currentScreen == "Categories" && (
        <FoodCategoryList categoryList={categoryList} />
      )}
      {currentScreen == "Add Category" && (
        <AddFoodCategory setScreen={setCurrentScreen} />
      )}
      {currentScreen == "Add Menu" && (
        <AddFoodMenu setScreen={setCurrentScreen} categoryList={categoryList} />
      )}
      {currentScreen == "Search" && (
        <FoodSearch category={categoryList} menu={foodMenu} />
      )}
    </>
  );
}

export default RestaurantMenu;
