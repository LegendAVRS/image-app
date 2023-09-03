// react
import { useEffect, useState } from "react";

// comps
import ControlBar from "./components/ControlBar";
import PostContainer from "./components/PostContainer";

// type
import { PostData } from "./interface/PostData";

// firebase
import { User } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import SearchBar from "./components/SearchBar";
import TagContainer from "./components/TagContainer";
import { auth, db } from "./config/firebase";

const App = () => {
  const [postDataList, setPostDataList] = useState<PostData[]>([]);
  // const [currentUser, setCurrentUser] = useState("No user");
  const [enabledTagList, setEnabledTagList] = useState([""]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // const [searchValue, setSearchValue] = useState([""]);
  const [allTagList, setAllTagList] = useState([""]);

  // get data from firestore
  const fetchData = () => {
    const imgCollectionRef = collection(db, "postData");
    getDocs(imgCollectionRef)
      .then((data) => {
        const dataListFiltered = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as PostData[];
        setPostDataList(dataListFiltered);
        console.log("data fetched");
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    let newEnabledTagList = [] as string[];
    postDataList.forEach((post) => {
      post.tags.forEach((tag) => {
        if (!newEnabledTagList.includes(tag)) newEnabledTagList.push(tag);
      });
    });
    setAllTagList(newEnabledTagList);
    setEnabledTagList(newEnabledTagList);
  }, [postDataList]);

  useEffect(() => {
    fetchData();
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else console.log("no user");
    });
  }, []);

  return (
    <div>
      <ControlBar
        setPostDataList={setPostDataList}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      ></ControlBar>
      <div className="m-auto w-1/2">
        <SearchBar
          allTagList={allTagList}
          setEnabledTagList={setEnabledTagList}
        ></SearchBar>
      </div>

      <div className={"flex flex-col w-full p-8 gap-4"}>
        <TagContainer
          enabledTagList={enabledTagList}
          setEnabledTagList={setEnabledTagList}
        ></TagContainer>
        <PostContainer
          postDataList={postDataList}
          setPostDataList={setPostDataList}
          enabledTagList={enabledTagList}
        ></PostContainer>
      </div>
    </div>
  );
};

export default App;
// ReactModal.setAppElement("App");
