import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Featured/>
      <div className="list">
        <List/>
        <List/>
        <List/>
        <List/>
      </div>
    </div>
  );
};

export default Home;
