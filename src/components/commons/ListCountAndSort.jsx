const ListCountAndSort = ({ totalCount, onSortChange, activeSort }) => {
  return (
    <div className="flex justify-between items-center w-full mb-2">
      <p>총 {totalCount}건</p>
      <select
        className="border px-2 py-1 rounded"
        onChange={(e) => onSortChange(e.target.value)}
        value={activeSort}
      >
        <option value="desc">최신순</option>
        <option value="asc">오래된 순</option>
      </select>
    </div>
  );
};

export default ListCountAndSort;
