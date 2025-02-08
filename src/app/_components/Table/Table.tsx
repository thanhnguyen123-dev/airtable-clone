"use client";

import React, { useEffect, useState, useMemo, useRef, type Dispatch } from "react";
import { api } from "~/trpc/react";
import Loader from "../Loader";
import TableHeader from "./TableHeader";
import TableCell from "./TableCell";
import AddColumnButton from "./AddColumnButton";
import AddRecordButton from "./AddRecordButton";
import TableRow from "./TableRow";
import { faker } from '@faker-js/faker';

import type { Column, Cell, Record as _Record } from "@prisma/client";
import { useReactTable, type ColumnDef, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

const FAKER_RECORDS_COUNT = 1000;

type TableProps = {
  tableId: string;
  searchValue: string;
  currentView: string;
  sortColumnId: string;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setSortColumnId: React.Dispatch<React.SetStateAction<string>>;
  hasView: boolean;
};

const TanStackTable = ({
  tableId, searchValue, currentView, sortColumnId, sort, setSort, setSortColumnId, hasView
}: TableProps) => {

   // fetch the current table
   const { data: tableData, isLoading, refetch } = api.table.getById.useQuery(
    { 
      tableId: tableId, 
      sortColumnId: sortColumnId,
      sortOrder: sort,
    },
    { enabled: !!tableId }
  );

  // local states for optimistic updates
  const [columns, setColumns] = useState<Column[]>([]);
  const [records, setRecords] = useState<_Record[]>([]);
  const [cells, setCells] = useState<Cell[]>([]);


  useEffect(() => {
    if (tableData) {
      setColumns(tableData.columns);
      setRecords(tableData.records);
      const combined = tableData.records.flatMap((rec) => rec.cells);
      setCells(combined);
    }
  }, [tableData]);

  const createFakeRecordsMutation = api.table.createFakeRecords.useMutation({
    onSuccess: () => refetch(),
  });
  const createColumnMutation = api.table.createColumn.useMutation({
    onSuccess: () => refetch(),
  });
  const createRecordMutation = api.table.createRecord.useMutation();

  const rowData = useMemo(() => {
    const map: Record<string, Record<string, string>> = {};
    for (const r of records) {
      map[r.id] = { recordId: r.id };
    }
    for (const cell of cells) {
      const record = map[cell.recordId];
      if (record) {
        record[cell.columnId] = cell.data;
      }
    }
    return Object.values(map);
  }, [records, cells]);

  const columnDefs = useMemo<ColumnDef<Record<string, string>>[]>(
    () =>
      columns.map((col) => ({
        accessorKey: col.id,
        header: ({column}) => {
          const isSorted = (col.id === sortColumnId);
          return (
            <TableHeader 
              header={col.name} 
              index={String(column.getIndex() ?? "")}
              isSorted={isSorted}
            />
          );
        },
        cell: ({ row }) => {
          const val = row.original[col.id] ?? "";
          const recId = row.original.recordId;
          const isSorted = (col.id === sortColumnId);
          return (
            <TableCell
              columnId={col.id}
              recordId={recId!}
              data={val}
              searchValue={searchValue}
              isSorted={isSorted}
            />
          );
        },
      })),
    [columns, searchValue, sortColumnId]
  );

  const tableInstance = useReactTable({
    data: rowData,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel(),
  });

  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: rowData.length,
    getScrollElement: () => parentRef.current!,
    estimateSize: () => 40,
    overscan: 5,
  });

  if (!tableId) {
    return <div className="flex-grow bg-white p-4">No table selected</div>;
  }

  if (isLoading) {
    return <div className="">Loading...</div>
  }
  if (!tableData) {
    return <div>Table not found</div>;
  }

  const handleAddRecord = async () => {
    try {
      const newId = crypto.randomUUID();
      const optimisticRecord: _Record = {
        id: newId,
        tableId: tableId,
        rowIndex: records.length,
      };
      setRecords((old) => [...old, optimisticRecord]);
  
      await createRecordMutation.mutateAsync({
        tableId,
        rowIndex: records.length,
        id: newId,
      });
  
    } catch (error) {
      console.error("Error creating record", error);    }
  };

  const handleAddColumn = async (colName: string) => {
    try {
      const newColId = crypto.randomUUID();
      const optimisticColumn: Column = {
        id: newColId,
        tableId: tableId,
        name: colName,
      };
      setColumns((old) => [...old, optimisticColumn]);
  
      const newCells: Cell[] = records.map((record) => ({
        id: `${record.id}-${newColId}`,
        recordId: record.id,
        columnId: newColId,
        data: "",
      }));
      setCells((old) => [...old, ...newCells]);
  
      await createColumnMutation.mutateAsync({
        tableId: tableId,
        name: colName,
        id: newColId, 
      });
    } catch (error) {
      console.error("Error creating column", error);
    }
  };
  
  
  const handleAddFakeRecords = () => {
    if (tableData.columns) {
      const columnIds = tableData.columns.map((col) => col.id);
      const seed = Date.now().toString();

      const optimisticRecords = Array.from({ length: FAKER_RECORDS_COUNT }, (_, i) => ({
        id: `optimistic-${seed}-${i}`,
        tableId: tableId,
        rowIndex: records.length + i,
      }));
      setRecords((prev) => [...prev, ...optimisticRecords]);

      const optimisticCells = optimisticRecords.flatMap((record) => 
        columnIds.map((colId) => ({
          id: `${record.id}-${colId}`,
          recordId: record.id,
          columnId: colId,
          data: faker.person.fullName(),
        }))
      )
      setCells((prev) => [...prev, ...optimisticCells]);

      createFakeRecordsMutation.mutate({
        tableId: tableId,
        columnIds: columnIds,
        seed: seed,
        count: FAKER_RECORDS_COUNT,
      });
    }
  };

  return (
    <div className="flex w-full bg-white overflow-y-auto overflow-x-auto">
      <div className="flex flex-col">
        <TableRow>
          {tableInstance.getHeaderGroups().flatMap(headerGroup =>
            headerGroup.headers.map(header => (
              <div key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </div>
            ))
          )}
        </TableRow>
        {tableInstance.getRowModel().rows.map((row, index) => {
          return (
            <TableRow key={index}>
              {row?.getVisibleCells().map((cell, colIndex) => {
                return (
                  <div key={cell.id} className={`flex items-center justify-center m-0 p-0 w-full`}>
                    {colIndex === 0 && (
                      <div className="flex items-center justify-start w-[70px] pl-[15px]">
                        <span className="flex items-center justify-start text-xs text-gray-500">
                          {index + 1}
                        </span>
                      </div>
                    )}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                );
              })}
            </TableRow>
          );
        })}
        <AddRecordButton 
          handleClick={handleAddRecord} 
          text="Add record"
        />
        <AddRecordButton 
          handleClick={handleAddFakeRecords} 
          text={`Add ${FAKER_RECORDS_COUNT} records`}
        />

      </div>
      <AddColumnButton
        onCreated={handleAddColumn}
      />
      <div className="px-3">current view: {currentView}</div>
    </div>
  );
};

export default TanStackTable;