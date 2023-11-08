import imgSrc from "../assets/404 Error.svg";
import TopBar from "../components/TopBar";

function Error404() {
  return (
    <>
      <TopBar />
      <div
        style={{ display: "flex", justifyContent: "center", height: "80vh" }}
      >
        <img src={imgSrc} alt="404 error" style={{ width: "500px" }} />
      </div>
    </>
  );
}

export default Error404;
