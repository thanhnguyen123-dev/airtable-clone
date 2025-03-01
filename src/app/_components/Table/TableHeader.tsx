import ColumnTypeIcon from "./ColumnTypeIcon";

type TableHeaderProps = {
  header: string;
  index?: string;
  isSorted: boolean;
  isFiltered: boolean;
  columnType: string;
};

const TableHeader = ({ 
  header, 
  index, 
  isSorted, 
  isFiltered, 
  columnType }: TableHeaderProps) => {
  const isFirstCol = index === "0";

  const hasBothFilterAndSort = isFiltered && isSorted;

  return (
    <div className={`h-full flex items-center justify-between px-2 border-gray-300 w-full
      ${isSorted && !hasBothFilterAndSort ? "bg-[#FFF2EA]" : ""}
      ${isFiltered && !hasBothFilterAndSort ? "bg-[#EBFBEC]" : ""}
      ${hasBothFilterAndSort ? "bg-[#EBE6A7]" : ""}
    `}>
      <div className="flex items-center">
        {isFirstCol && (
          <div className="flex items-center justify-center pl-[9px]">
            <input
              type="checkbox"
              name="select"
              className="mr-2 h-3 w-3"
            />
          </div>
        )}
        <div className="flex items-center mr-1">
          <ColumnTypeIcon columnType={columnType} />
        </div>
        <span className="text-xs text-slate-700 font-normal">{header}</span>
      </div>  
      <svg
        role="button"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        className="flex-none"
      >
        <use href="icons/icons_definitions.svg#ChevronDown"></use>
      </svg>  
    </div>
  );
};

export default TableHeader;
