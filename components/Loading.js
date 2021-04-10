import { Circle } from "better-react-spinkit";

const Loading = () => {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXSzML_98pBX92MNo-u4_m-YQ11RLzpRC04Q&usqp=CAU"
          alt="chatware"
          style={{ marginButton: 10 }}
          height={200}
        />
        <Circle color="skyblue" size={60} />
      </div>
    </center>
  );
};

export default Loading;
