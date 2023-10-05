import React, { Dispatch, SetStateAction, useState } from "react";
import { foodMenuCategoryType, foodMenuItemType } from "../../Data.types";
import Style from "../../styles/editfoodmenu.module.css";
import { toast } from "react-toastify";
import Loading from "../Loading";

interface editFoodMenuProps {
  item: foodMenuItemType;
  setScreen: Dispatch<SetStateAction<string>>;
  categoryList: foodMenuCategoryType[];
}

function EditFoodMenu({ item, categoryList, setScreen }: editFoodMenuProps) {
  const [loading, setLoading] = useState(false);
  const [changedInformation, setChangedInformation] = useState({
    _id: item._id,
    name: item.name,
    description: item.price,
    price: item.price,
    category: item.category,
  });
  const handleEditInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const request = await fetch(
      import.meta.env.VITE_API_URL + "frontdesk/menu",
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(changedInformation),
      }
    );
    setLoading(false);
    if (request.status == 200) {
      toast.success("Item updated successfully.");
      setScreen("Food Menu");
    }
  };
  return (
    <>
      {loading && <Loading />}
      <section className={Style.container}>
        <h1 className={Style.title}>Edit Food Menu: {item.name}</h1>
        <p>Please make the necessary changes and click save.</p>
        <section className={Style.sectionWrapper}>
          <div className={Style.sectionImage}>
            <img
              src="https://img.freepik.com/free-vector/group-junk-food-sweet-isolated-white_1308-56156.jpg"
              alt=""
            />
            <button className={Style.imageButton}>Change Image</button>
          </div>
          <form onSubmit={handleEditInfo} className={Style.sectionForm}>
            <fieldset className={Style.field}>
              <label htmlFor="title">Item Name: </label>
              <input
                type="text"
                value={changedInformation.name}
                onChange={(e) =>
                  setChangedInformation({
                    ...changedInformation,
                    name: e.target.value,
                  })
                }
                name="title"
                id="title"
                placeholder={item.name}
              />
            </fieldset>
            <fieldset className={Style.field}>
              <label htmlFor="price">Price :</label>
              <input
                type="text"
                value={changedInformation.price}
                onChange={(e) =>
                  setChangedInformation({
                    ...changedInformation,
                    price: e.target.value,
                  })
                }
                name="price"
                id="price"
                placeholder={item.price}
              />
            </fieldset>
            <fieldset className={Style.field}>
              <label htmlFor="category">Category: </label>
              <select
                className={Style.field}
                onChange={(e) =>
                  setChangedInformation({
                    ...changedInformation,
                    category: e.target.value,
                  })
                }
                name="category"
                id="category"
                defaultValue={item.category}
              >
                {categoryList.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className={Style.buttonWrapper}>
              <button
                type="reset"
                onClick={() => setScreen("Food Menu")}
                className={Style.cancelButton}
              >
                Cancel
              </button>
              <button type="submit" className={Style.saveButton}>
                Save Changes
              </button>
            </fieldset>
          </form>
        </section>
      </section>
    </>
  );
}

export default EditFoodMenu;
