"use client";
import { usePathname } from "next/navigation";
import { api } from "~/trpc/react";
import BaseNavBar from "../_components/Base/BaseNavBar";
import BaseToolBar from "../_components/Base/BaseToolBar";
import Loader from "../_components/Loader";
import TableToolBar from "../_components/Table/TableToolBar";
import TableSideBar from "../_components/Table/TableSideBar";
import { FcBrokenLink } from "react-icons/fc";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Table from "../_components/Table/Table";

const BasePage = () => {
  // extract the base id based on url
  const baseId = usePathname().split("/")[1];

  // load the current base
  const { data: base, isLoading: isBaseLoading } = api.base.getById.useQuery(
    { id: baseId! },
    { enabled: !!baseId }
  );

  // extract all tables from the base
  const { data: tables, isLoading: isTablesLoading } = api.table.getAll.useQuery(
    { baseId: baseId! },
    { enabled: !!baseId }
  );

  const [currentTableId, setCurrentTableId] = useState<string | undefined>(tables?.[0]?.id);
  const [searchValue, setSearchValue] = useState("");
  const [currentView, setCurrentView] = useState("");

  useEffect(() => {
    if (tables?.[0] && tables.length > 0 && !currentTableId) {
      setCurrentTableId(tables[0].id);
    }
  }, [tables, currentTableId]);

  useEffect(() => {
    setSearchValue("");
  }, [currentTableId]);

  useEffect(() => {
    setCurrentView("");
  }, [currentTableId]);



  if (isBaseLoading || isTablesLoading) {
    return <Loader />
  }

  if (!base?.id) {
    return (
      <div className="fixed inset-0 flex flex-col gap-4 items-center justify-center bg-white z-50">
        <FcBrokenLink size={64} />
        <p className="text-3xl font-bold">BASE NOT FOUND</p>
      </div>
    );
  }

  return (
    <div className="bg-grey flex flex-col w-full max-w-10xl h-screen">
      <BaseNavBar />
      <BaseToolBar 
        baseId={baseId!}
        tables={tables ?? []}
        currentTableId={currentTableId ?? ""}
        handleTableSwitch={setCurrentTableId}
      />
      <TableToolBar 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        tableId={currentTableId ?? ""}
      />
      <div className="h-screen max-w-10xl flex flex-grow overflow-y-auto">
        <TableSideBar 
          tableId={currentTableId ?? ""}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
        <Table 
          tableId={currentTableId ?? ""}
          currentView={currentView}
          searchValue={searchValue}
        />
      </div>
    </div>
  );
}

export default BasePage;