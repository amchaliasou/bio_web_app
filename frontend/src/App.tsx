import Footer from "components/Footer";
import Header from "components/Header";
import Loading from "components/Loading";
import { useAuthentication } from "hooks/useAuthentication";
import { observer } from "mobx-react";
import EditDisease from "pages/EditDisease";
import InsertDisease from "pages/InsertDisease";
import NotFound from "pages/NotFound";
import DataTable from "pages/Table";
import { Route, Routes } from "react-router-dom";
import { useStores } from "stores/rootStore";
import "./App.css";

const App = observer(() => {
  const { functionalityStore } = useStores();
  useAuthentication();
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" index element={<DataTable />} />
        <Route path="/insert-disease" element={<InsertDisease />} />
        <Route path="/edit-disease/:umlsCui" element={<EditDisease />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Loading loading={functionalityStore.loading} />
    </div>
  );
});

export default App;
