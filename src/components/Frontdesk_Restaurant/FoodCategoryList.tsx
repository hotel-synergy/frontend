import { toast } from "react-toastify";
import { foodMenuCategoryType } from "../../Data.types";
import categoryStyle from "../../styles/categoryStyle.module.css";
interface CategoryListProps {
  categoryList: foodMenuCategoryType[];
}

/*
fields in category are:
name, description, items, (id: hidden) and action
TODO: add edit and delete button functionality
*/

function FoodCategoryList({ categoryList }: CategoryListProps) {
  const deleteItem = async (item_id: string) => {
    const request = await fetch(
      import.meta.env.VITE_API_URL + "frontdesk/menu/category",
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ _id: item_id }),
      }
    );

    if (request.status == 200) {
      toast.success("Category deleted successfully.");
    }
    if (request.status == 401) {
      toast.error("You are not allowed to delete this item.");
    }
    if (request.status === 404) {
      toast.error("That category was not found");
    }
    if (request.status == 400) {
      toast.error("Please provide a valid ID.");
    }
  };

  if (categoryList.length == 0) {
    return (
      <>
        <p>There are no categories to display.</p>
      </>
    );
  } else {
    return (
      <section className={categoryStyle.wrapper}>
        <header className={categoryStyle.header}>
          <span style={{ backgroundColor: "green", color: "white" }}>S.N</span>
          <span>Name</span>
          <span>Description</span>
          <span>Total Items</span>
          <span>Action</span>
        </header>
        {categoryList.map((category, index) => (
          <div key={category._id} className={categoryStyle.category}>
            <span style={{ backgroundColor: "green", color: "white" }}>
              {index + 1}
            </span>
            <span>{category.name}</span>
            <span>{category.description}</span>
            <span>{category.items}</span>
            <span>
              <button className={categoryStyle.editBtn}>
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button
                onClick={() => {
                  const ans = confirm(
                    `${category.name} and ${category.items} items in this category will be deleted.`
                  );
                  if (ans) {
                    deleteItem(category._id);
                  }
                }}
                className={categoryStyle.deleteBtn}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </span>
          </div>
        ))}
      </section>
    );
  }
}

export default FoodCategoryList;
