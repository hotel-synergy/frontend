import React, { Dispatch, SetStateAction, useState } from "react";
import { foodMenuCategoryType } from "../../Data.types";
import Style from "../../styles/frontdeskfoodmenu.module.css";
import { toast } from "react-toastify";
import Loading from "../Loading";

interface CategoryListProps {
  categoryList: foodMenuCategoryType[];
  setScreen: Dispatch<SetStateAction<string>>;
}

function AddFoodMenu({ categoryList, setScreen }: CategoryListProps) {
  const [loading, setLoading] = useState(false);
  const clearScreen = () => {
    setLoading(false);
    setScreen("Food Menu");
  };
  const [newItemInformation, setNewItemInformation] = useState({
    name: "",
    category: categoryList[0]._id,
    price: "",
    description: "",
  });
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const request = await fetch(
      import.meta.env.VITE_API_URL + "frontdesk/menu",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newItemInformation),
      }
    );
    setLoading(true);
    if (request.status === 200) {
      // TODO: navigate to uploader with details to upload path.
      setScreen("Food Menu");
      setLoading(false);
      return toast.success("Menu added successfully.");
    }
    if (request.status == 400) {
      setLoading(false);
      return toast.error("Please check the information provided");
    }
    if (request.status == 404) {
      setLoading(false);
      return toast.error("Please provide a valid category.");
    }
    clearScreen();
    if (request.status == 401) {
      return toast.error("You can not add new menu");
    }
    if (request.status == 500) {
      return toast.error(
        "There was an unknown server error, please try again later."
      );
    }
    if (!request.ok) {
      return toast.error("An unknown error occoured.");
    }
  };
  if (categoryList.length === 0) {
    return (
      <>
        <p>Please add a new category first to add menu items.</p>
      </>
    );
  } else {
    return (
      <>
        {loading && <Loading />}
        <section className={Style.addCategoryContainer}>
          <h1>Add New Menu Item</h1>
          <p>Please provide information about the new item.</p>
          <form onSubmit={submitForm}>
            <input
              value={newItemInformation.name}
              onChange={(e) =>
                setNewItemInformation({
                  ...newItemInformation,
                  name: e.target.value,
                })
              }
              type="text"
              name="name"
              id="name"
              placeholder="Item name"
            />
            <select
              defaultValue={categoryList[0]._id}
              name="category"
              onChange={(e) =>
                setNewItemInformation({
                  ...newItemInformation,
                  category: e.target.value,
                })
              }
              id="category"
            >
              {categoryList.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={newItemInformation.price}
              onChange={(e) =>
                setNewItemInformation({
                  ...newItemInformation,
                  price: e.target.value,
                })
              }
              placeholder="Price"
            />
            <input
              type="text"
              name="description"
              id="description"
              value={newItemInformation.description}
              onChange={(e) =>
                setNewItemInformation({
                  ...newItemInformation,
                  description: e.target.value,
                })
              }
              placeholder="Description"
            />
            <fieldset>
              <button
                type="reset"
                onClick={clearScreen}
                className={Style.addcategoryCancel}
              >
                Cancel
              </button>
              <button type="submit" className={Style.addcategorySave}>
                Save New Item
              </button>
            </fieldset>
          </form>
        </section>
      </>
    );
  }
}

export default AddFoodMenu;
