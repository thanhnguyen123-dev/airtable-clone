"use client";

import React, { useState } from "react";
import ColumnType from "@prisma/client";
import { api } from "~/trpc/react";

interface TableCellProps {
  value: string | number,
  columnId: string,
  recordId: string,
  columnType: "TEXT" | "NUMBER",
}


