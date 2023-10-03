import { toast } from "react-toastify";
import { foodMenuItemType } from "../../Data.types";
import Style from "../../styles/foodmenu.module.css";
import { useState } from "react";
import Loading from "../Loading";

interface foodMenuProps {
  foodList: foodMenuItemType[];
}

function FoodMenu({ foodList }: foodMenuProps) {
  const [loading, setLoading] = useState(false);
  const deleteItem = async (item_id: string) => {
    const request = await fetch(
      import.meta.env.VITE_API_URL + "frontdesk/menu",
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ _id: item_id }),
      }
    );

    if (request.status == 200) {
      toast.success("Item deleted successfully.");
    }
    if (request.status == 401) {
      toast.error("You are not allowed to delete this item.");
    }
    if (request.status === 404) {
      toast.error("That item was not found");
    }
    if (request.status == 400) {
      toast.error("Please provide a valid ID.");
    }
  };
  if (foodList.length === 0) {
    return (
      <>
        <p>There are no food items to display.</p>
      </>
    );
  } else {
    return (
      <div className={Style.container}>
        {loading && <Loading />}
        {foodList.map((item) => (
          <div className={Style.wrapper} key={item._id}>
            <img
              className={Style.image}
              src={
                item.image === "demo"
                  ? "https://img.freepik.com/free-vector/group-junk-food-sweet-isolated-white_1308-56156.jpg"
                  : item.image
              }
              alt=""
            />
            <span className={Style.information}>
              <p className={Style.title}>{item.name}</p>
              <p className={Style.category}>{item.category}</p>
              <p className={Style.price}>Rs. {item.price}</p>
              <button className={Style.buttonEdit}>
                <span className="material-symbols-outlined">edit</span>Edit Item
              </button>
              <button
                onClick={() => {
                  const ans = confirm(`The item ${item.name} will be deleted`);
                  if (ans) {
                    deleteItem(item._id);
                  }
                }}
                className={Style.buttonDelete}
              >
                <span className="material-symbols-outlined">delete</span>Delete
                Item
              </button>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default FoodMenu;
