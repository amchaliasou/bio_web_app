import { Spin } from "antd";
import "./index.css";
interface ILoadingProps {
  loading: boolean;
}
const Loading: React.FC<ILoadingProps> = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className="loading-wrapper">
          <div className="loading">
            <Spin size="large" />
            <span className="text">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
