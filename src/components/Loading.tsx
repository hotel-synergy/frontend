import loader from "../styles/loader.module.css";
import "../styles/loader.css";
function Loading() {
  return (
    <section className={loader.main}>
      <dialog className={loader.dialog}>
        <div className="loadingio-spinner-disk-bljzl2srh9g">
          <div className="ldio-74d9b9sja2w">
            <div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <h1 id="loader-text">Loading please wait...</h1>
      </dialog>
    </section>
  );
}

export default Loading;
