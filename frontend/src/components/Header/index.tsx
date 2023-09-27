import { Avatar, Button, Layout } from "antd";
import Search from "components/Search";
import { observer } from "mobx-react";
import Login from "pages/Login";
import React, { useState } from "react";
import { useStores } from "stores/rootStore";
import "./index.css";

const { Header: AntHeader } = Layout;

const Header: React.FC = observer(() => {
  const { authenticationStore } = useStores();

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <AntHeader className="header">
      <div className="user-actions">
        {authenticationStore.isAuthenticated ? (
          <>
            <Avatar style={{ backgroundColor: "#72a5b4", border: "1px solid white" }}>
              {authenticationStore.username
                ? authenticationStore.username[0].toUpperCase()
                : ""}
            </Avatar>
            <Button
              style={{ backgroundColor: "#72a5b4", border: "1px solid white"}}
              type="primary"
              danger
              onClick={() => {
                authenticationStore.logout();
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button style={{ backgroundColor: "#72a5b4", border: "1px solid white"}}
            type="primary"
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            Login
          </Button>
        )}
      </div>
      <Search />
      <Login
        isModalOpen={isModalVisible}
        handleCancel={() => setIsModalVisible(false)}
      />
    </AntHeader>
  );
});

export default Header;
