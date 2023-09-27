import { Card } from "antd";
import _404 from "assets/svgs/404.svg";
import "./index.css";

const NotFound: React.FC = () => {
  return (
    <Card className="not-found-card">
      <img src={_404} alt="page not found" />
        <h1>Page Not Found</h1>
    </Card>
  );
};

export default NotFound;
