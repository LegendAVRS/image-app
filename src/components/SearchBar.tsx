import React, { useState } from "react";

interface SearchBarProps {
  setEnabledTagList: Function;
  allTagList: string[];
}

const SearchBar = ({ setEnabledTagList, allTagList }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event: React.KeyboardEvent) => {
    if (event.key !== "Enter") return;
    if (searchValue === "") {
      setEnabledTagList(allTagList);
      return;
    }
    let valueList = searchValue.split(/[ _]/);
    setEnabledTagList(valueList);
  };
  return (
    <div className="flex h-full flex-1 gap-1">
      <input
        type="text"
        placeholder="Name, tags..."
        className="input-text"
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => handleSearch(e)}
      />
      {/* <button>
        <img src="svg/search.png" className={" h-1/2"} alt="" />
      </button> */}
    </div>
  );
};

export default SearchBar;
