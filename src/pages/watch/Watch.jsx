import { ArrowBackOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./watch.scss";

export default function Watch() {
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video className="video" autoPlay controls src="/assets/video/video.mp4" />
    </div>
  );
}
