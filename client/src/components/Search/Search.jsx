import React, { useState } from "react";
import { SearchIcon } from "../../assets";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  return (
    <div>
      <form action="" className="w-[280px] relative">
        <input
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          type="text"
          placeholder="Tìm kiếm..."
          className="py-[6px] px-2 w-full outline-none border-[1px] border-secondaryIconColor focus:border-secondaryColor rounded-md text-textColor text-sm placeholder:text-sm"
        />
        <span className="absolute top-[50%] -translate-y-1/2 right-2">
          <SearchIcon />
        </span>
      </form>
    </div>
  );
};

export default Search;
