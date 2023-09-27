import { Input, Select } from "antd";
import "./index.css";
import { observer } from "mobx-react";
import { useStores } from "stores/rootStore";
const { Search } = Input;

const { Option } = Select;

const SearchInput: React.FC = observer(() => {

  const { functionalityStore } = useStores();

  const handleSelectChange = (value: "Disease" | "Gene") => {
    functionalityStore.setSearchParam(value);
  };

  const handleSearch = (searchValue: string) => {
    functionalityStore.setSearchValue(searchValue);
  };

  const selectBefore = (
    <Select  onChange={handleSelectChange}  placeholder="Select Entries"  style={{ width: 200 }}>
      <Option value="Disease">Disease</Option>
      <Option value="Gene">Gene</Option>
    </Select>
  );
  return (
    <div className="search-wrapper">
      <Search 
        className="search"
        addonBefore={selectBefore}
        placeholder={`Type your search terms`}
        onSearch={handleSearch}
        enterButton
        
      />
    </div>
  );
});

export default SearchInput;
