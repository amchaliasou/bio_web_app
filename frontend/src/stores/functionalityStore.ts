import { makeAutoObservable } from "mobx";

class FunctionalityStore {
  loading: boolean = false;
  shouldUpdate: boolean = false;
  searchParam: "Disease" | "Gene" | undefined = undefined;
  searchValue: string | undefined =  undefined ;
  constructor() {
    makeAutoObservable(this);
  }

  public triggerActivity = (value: boolean) => {
    this.loading = value;
  };
  toggleActivity = () => {
    this.loading = !this.loading;
  };

  toggleShouldUpdate = () => {
    this.shouldUpdate = !this.shouldUpdate;
  };
  setSearchParam = (value: "Disease" | "Gene" ) => {
    this.searchParam = value;
  };
  setSearchValue = (searchValue: string | undefined ) => {
    this.searchValue = searchValue;
  };

}

export default FunctionalityStore;