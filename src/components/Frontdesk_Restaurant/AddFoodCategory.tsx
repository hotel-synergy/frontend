import React, { Dispatch, SetStateAction, useState } from "react";
import Style from "../../styles/frontdeskfoodmenu.module.css";
import Loading from "../Loading";
import { toast } from "react-toastify";

interface addFoodCategoryProps {
  setScreen: Dispatch<SetStateAction<string>>;
}

function AddFoodCategory({ setScreen }: addFoodCategoryProps) {
  const [loading, setLoading] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState({
    name: "",
    description: "",
  });

  const clearScreen = () => {
    setLoading(false);
    setScreen("Categories");
  };

  const addNewCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const request = await fetch(
      import.meta.env.VITE_API_URL + "frontdesk/menu/category",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: categoryDetails.name,
          description: categoryDetails.description,
        }),
      }
    );
    const data = await request.json();

    if (request.status === 400) {
      //if information is wrong, allow to edit it and don't change the screen.
      setLoading(false);
      return toast.error("Please recheck the information provided.");
    }
    // if any other issue or success, clear screen and toast message.
    clearScreen();
    if (request.status === 200) {
      return toast.success("Category added successfully.");
    }
    if (request.status === 401) {
      return toast.error("You are not allowed to add new category.");
    }
    if (request.status === 500) {
      return toast.error(
        "There was an unknown server error, please try again later."
      );
    }
  };
  return (
    <section className={Style.addCategoryContainer}>
      {loading && <Loading />}
      <h1 className="title">Add new category</h1>
      <p className="description">
        Please provide some information about the new category.
      </p>
      <form onSubmit={addNewCategory}>
        <input
          className="input-name"
          type="text"
          value={categoryDetails.name}
          onChange={(e) =>
            setCategoryDetails({ ...categoryDetails, name: e.target.value })
          }
          name="category-name"
          placeholder="Category Name"
        />
        <input
          className="input-description"
          type="text"
          value={categoryDetails.description}
          onChange={(e) =>
            setCategoryDetails({
              ...categoryDetails,
              description: e.target.value,
            })
          }
          name="category-description"
          placeholder="Description"
        />
        <fieldset className="button-wrapper">
          <button
            onClick={clearScreen}
            className={Style.addcategoryCancel}
            type="reset"
          >
            Cancel
          </button>
          <button className={Style.addcategorySave} type="submit">
            Add Category
          </button>
        </fieldset>
      </form>
    </section>
  );
}

export default AddFoodCategory;
