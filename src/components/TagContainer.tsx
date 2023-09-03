import TagCard from "./TagCard";

interface TagContainerProps {
  enabledTagList: string[];
  setEnabledTagList: Function;
}

const TagContainer = ({
  enabledTagList,
  setEnabledTagList,
}: TagContainerProps) => {
  return (
    <div>
      <h2 className="h2-label">Tags</h2>
      <div className="flex gap-1 flex-wrap">
        {enabledTagList.map((tag) => (
          <TagCard tag={tag} setEnabledTagList={setEnabledTagList}></TagCard>
        ))}
      </div>
    </div>
  );
};

export default TagContainer;
