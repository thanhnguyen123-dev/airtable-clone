"use client";
import React from 'react';
import { api } from '~/trpc/react';
import NavTableButton from '../Table/NavTableButton';
import { type Table } from '@prisma/client';

type BaseToolBarProps = {
  baseId: string
  tables: Table[],
  currentTableId: string,
  handleTableSwitch: (id: string) => void,
}

const BaseToolBar = ({baseId, tables, currentTableId, handleTableSwitch } : BaseToolBarProps) => {
  const utils = api.useUtils()
  const createTableMutation = api.table.createDefaultTable.useMutation();

  const handleCreateTable = async () => {
    const result = await createTableMutation.mutateAsync({
      baseId: baseId,
      name: `Table ${tables.length + 1}`
    });
    const newTable: Table = result.table;
    const newTables: Table[] = [...tables, newTable];
    utils.table.getAll.setData({baseId}, newTables);

    handleTableSwitch(result.table.id);
  };

  return (
    <div 
      className="flex items-center justify-between w-full h-[32px] text-[11px] sticky top-0 z-20 bg-pale-teal-green"
    >
      <div 
        className="flex items-center w-[89%] h-[2rem] px-4 sticky top-0 rounded-tr-md bg-dark-teal-green"
      >
        {/* Render table tabs */}
        {tables.map((table, index) => (
          <NavTableButton
            key={index}
            tableName={table.name}
            isActive={table.id === currentTableId}
            handleClick={() => handleTableSwitch(table.id)}
          />
        ))}

        <div className='flex items-center gap-2'>
          <svg
            role='button'
            width={16}
            height={16}
            viewBox="0 0 16 16"
            className="flex-none ml-2"
            fill="white"
          >
            <use href="icons/icons_definitions.svg#ChevronDown"></use>
          </svg>
          <div className="separator"></div>
          <div
            role='button'
            className="flex items-center justify-center gap-2"
            onClick={handleCreateTable}
            >
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              className="flex-none"
              fill="white"
            >
              <use href="icons/icons_definitions.svg#Plus"></use>
            </svg>
            <span className="text-slate-100 hover:text-white">Add or import</span>
          </div>
        </div>
      </div>

      <div 
        className="flex text-white justify-between items-center w-[10%] h-[2rem] px-[10px] sticky top-0 rounded-tl-md bg-dark-teal-green"
      >
        <div role='button'>
          <span>Extensions</span>
        </div>

        <div role='button' className='flex items-center gap-2'>
          <span>Tools</span>
          <svg
            role='button'
            width={16}
            height={16}
            viewBox="0 0 16 16"
            className="flex-none"
            fill="white"
          >
            <use href="icons/icons_definitions.svg#ChevronDown"></use>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default BaseToolBar