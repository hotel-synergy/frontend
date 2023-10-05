import { Dispatch, SetStateAction, useState } from "react";
import { foodMenuCategoryType } from "../../Data.types";
import Style from "../../styles/editfoodcategory.module.css";
import { toast } from "react-toastify";
import Loading from "../Loading";

interface editFoodCategoryProps {
  item: foodMenuCategoryType;
  setScreen: Dispatch<SetStateAction<string>>;
}
function EditFoodCategory({ item, setScreen }: editFoodCategoryProps) {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    name: item.name,
    description: item.description,
  });
  return (
    <section className={Style.editSection}>
      <h1 className={Style.title}>
        Edit Category:{" "}
        <strong style={{ fontWeight: "bold" }}>{item.name}</strong>
      </h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          const request = await fetch(
            import.meta.env.VITE_API_URL + "frontdesk/menu/category",
            {
              method: "PUT",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                _id: item._id,
                name: info.name,
                description: info.description,
              }),
            }
          );
          setLoading(false);
          if (request.status === 200) {
            toast.success("Category updated successfully.");
            setScreen("Categories");
          }
        }}
      >
        {loading && <Loading />}
        <fieldset className={Style.input}>
          <label htmlFor="">Name: </label>
          <input
            type="text"
            value={info.name}
            name=""
            onChange={(e) => setInfo({ ...info, name: e.target.value })}
            placeholder={item.name}
            id=""
          />
        </fieldset>
        <fieldset className={Style.input}>
          <label htmlFor="">Description: </label>
          <input
            value={info.description}
            onChange={(e) => setInfo({ ...info, description: e.target.value })}
            type="text"
            name=""
            placeholder={item.description}
            id=""
          />
        </fieldset>
        <fieldset className={Style.imageOption}>
          <label htmlFor="">Image:</label>
          <button
            onClick={(e) => {
              e.preventDefault();
              //TODO:open up the image uploader tool with the required information
            }}
            className={Style.imageButton}
          >
            Edit Image
          </button>
        </fieldset>
        <fieldset className={Style.btnWrapper}>
          <button
            onClick={() => setScreen("Categories")}
            className={Style.btnCancel}
            type="reset"
          >
            Cancel
          </button>
          <button className={Style.btnSubmit} type="submit">
            Save Changes
          </button>
        </fieldset>
      </form>
    </section>
  );
}

export default EditFoodCategory;
