import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { faker } from '@faker-js/faker';
import next from "next";

export const tableRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ baseId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const tableCount = await ctx.db.table.count({
        where: { baseId: input.baseId },
      });

      return ctx.db.table.create({
        data: {
          name: `Table ${tableCount + 1}`,
          baseId: input.baseId,
        }
      });
    }),
  
  getAll: protectedProcedure
    .input(z.object({ baseId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.table.findMany({
        where: { baseId: input.baseId },
      });
    }),

  getCells: protectedProcedure
    .input(
      z.object({ 
        tableId: z.string().min(1),
        sortColumnId: z.string().optional(),
        sortOrder: z.string().optional(),
        filterColumnId: z.string().optional(),
        filterCond: z.string().optional(),
        filterValue: z.string().optional(),
        offset: z.number().int(),
        limit: z.number().int(),
      })
    )
    .query(async ({ ctx, input }) => {
      const {
        tableId,
        sortColumnId,
        sortOrder,
        filterColumnId,
        filterCond,
        filterValue,
        offset,
        limit,
      } = input;
      let condObject = {};
      let recs;

      if (filterColumnId !== "") {
        switch (filterCond) {
          case "contains":
            condObject = { contains: filterValue };
            break;
          case "does not contain":
            condObject = { not: { contains: filterValue } };
            break;
          case "is":
            condObject = { equals: filterValue };
            break;
          case "is not":
            condObject = { not: { equals: filterValue } };
            break;
          case "is empty":
            condObject = { equals: "" };
            break;
          case "is not empty":
            condObject = { not: { equals: "" } };
            break;
          default:
            break;
        }
        if (sortColumnId=== "") {
          return await ctx.db.record.findMany({
            where: {
              tableId: input.tableId,
              cells: {
                some: {
                  columnId: filterColumnId,
                  data: condObject,
                },
              }
            },
            include: { cells: true },
            orderBy: { rowIndex: "asc" },
            skip: offset,
            take: limit,
          }).then((records) => records.flatMap((record) => record.cells));
        } else {
          recs = await ctx.db.record.findMany({
            where: {
              tableId: input.tableId,
              cells: {
                some: {
                  columnId: filterColumnId,
                  data: condObject,
                },
              }
            },
            include: { cells: true },
            orderBy: { rowIndex: "asc" },
          });
        }
      } 
      else {
        if (sortColumnId === "") {
          return await ctx.db.record.findMany({
            where: { tableId: input.tableId },
            include: { cells: true },
            orderBy: { rowIndex: "asc" },
            skip: offset,
            take: limit,
          }).then((records) => records.flatMap((record) => record.cells));
        } else {
          recs = await ctx.db.record.findMany({
            where: { tableId: input.tableId },
            include: { cells: true },
            orderBy: { rowIndex: "asc" },
          });
        }
      }

      switch (sortOrder) {
        case "A - Z":
          recs?.sort((a, b) => {
            const valA = a.cells.find(cell => cell.columnId === sortColumnId)?.data ?? "";
            const valB = b.cells.find(cell => cell.columnId === sortColumnId)?.data ?? "";
            return valA.localeCompare(valB);
          });
          break;
        case "Z - A":
          recs?.sort((a, b) => {
            const valA = a.cells.find(cell => cell.columnId === sortColumnId)?.data ?? "";
            const valB = b.cells.find(cell => cell.columnId === sortColumnId)?.data ?? "";
            return valB.localeCompare(valA);
          });
          break;
        default:
          break;
      }

      const nextRecs = recs?.slice(offset, offset + limit); 
      const nextCells = nextRecs?.flatMap((record) => record.cells);

      return nextCells;
    }),

  getRecords: protectedProcedure
    .input(
      z.object({ 
        tableId: z.string().min(1),
        sortColumnId: z.string().optional(),
        sortOrder: z.string().optional(),
        filterColumnId: z.string().optional(),
        filterCond: z.string().optional(),
        filterValue: z.string().optional(),
        cursor: z.string().optional(),
        limit: z.number().int(),
      })
    )
    .query(async ({ ctx, input }) => {
      let records;

      if (input.sortColumnId && input.sortOrder) {
        records = await ctx.db.record.findMany({
          where: { 
            tableId: input.tableId,
          },
          include: { cells: true },
          orderBy: { rowIndex: "asc" },
        });

        if (input.filterColumnId !== "") {
          records = records.filter((record) => {
            return record.cells.some((cell) => {
              if (cell.columnId !== input.filterColumnId) return false;
              switch (input.filterCond) {
                case "contains":
                  return cell.data.toLowerCase().includes(input.filterValue?.toLowerCase() ?? "");
                case "does not contain":
                  return !cell.data.toLowerCase().includes(input.filterValue?.toLowerCase() ?? "");
                case "is":
                  return cell.data === input.filterValue;
                case "is not":
                  return cell.data !== input.filterValue;
                case "is empty":
                  return cell.data === "";
                case "is not empty":
                  return cell.data !== "";
                default:
                  return false;
              }
            });
          });
        }

        records.sort((a, b) => {
          const valA = a.cells.find(cell => cell.columnId === input.sortColumnId)?.data ?? "";
          const valB = b.cells.find(cell => cell.columnId === input.sortColumnId)?.data ?? "";
          if (input.sortOrder === "A - Z") {
            return valA.localeCompare(valB);
          } else if (input.sortOrder === "Z - A") {
            return valB.localeCompare(valA);
          }
          return 0;
        });

      } else {
        records = await ctx.db.record.findMany({
          where: { tableId: input.tableId },
          include: { cells: true },
          orderBy: { rowIndex: "asc" },
          take: input.limit + 1,
          cursor: input.cursor ? { id: input.cursor } : undefined,
          skip: input.cursor ? 1 : undefined,
        });

        if (input.filterColumnId && input.filterColumnId !== "") {
          records = records.filter((record) => {
            return record.cells.some((cell) => {
              if (cell.columnId !== input.filterColumnId) return false;
              switch (input.filterCond) {
                case "contains":
                  return cell.data.toLowerCase().includes(input.filterValue?.toLowerCase() ?? "");
                case "does not contain":
                  return !cell.data.toLowerCase().includes(input.filterValue?.toLowerCase() ?? "");
                case "is":
                  return cell.data === input.filterValue;
                case "is not":
                  return cell.data !== input.filterValue;
                case "is empty":
                  return cell.data === "";
                case "is not empty":
                  return cell.data !== "";
                default:
                  return false;
              }
            });
          });
        }
      }
    
      let nextCursor = undefined;
      if (records.length > input.limit) {
        const nextRecord = records.pop();
        nextCursor = nextRecord?.id;
      }

    return { records, nextCursor };
  }),

  getById: protectedProcedure
    .input(z.object({ 
      tableId: z.string().min(1),
      sortColumnId: z.string().optional(),
      sortOrder: z.string().optional(),
      filterColumnId: z.string().optional(),
      filterCond: z.string().optional(),
      filterValue: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const table = await ctx.db.table.findUnique({
        where: { id: input.tableId },
        include: { 
          columns: true ,
          records: {
            include: { cells: true },
          },
          views: true
        },
      });

      if (input.filterColumnId !== "") {
        table!.records = table!.records.filter((record) => {
          return record.cells.some((cell) => {
            if (cell.columnId !== input.filterColumnId) return false;
      
            switch (input.filterCond) {
              case "contains":
                return cell.data.includes(input.filterValue ?? "");
              case "does not contain":
                return !cell.data.includes(input.filterValue ?? "");
              case "is":
                return cell.data === input.filterValue;
              case "is not":
                return cell.data !== input.filterValue;
              case "is empty":
                return cell.data === "";
              case "is not empty":
                return cell.data !== "";
              default:
                return false;
            }
          });
        });
      }
      

      if (input.sortColumnId && input.sortOrder) {
        table?.records.sort((a, b) => {
          const valA = a.cells.find(cell => cell.columnId === input.sortColumnId)?.data ?? "";
          const valB = b.cells.find(cell => cell.columnId === input.sortColumnId)?.data ?? "";
          if (input.sortOrder === "A - Z") {
            return valA.localeCompare(valB);
          } else if (input.sortOrder === "Z - A") {
            return valB.localeCompare(valA);
          }
          return 0;
        });
      }

      return table;
    }),

  createColumn: protectedProcedure
    .input(
      z.object({ 
        tableId: z.string().min(1), 
        name: z.string().min(1),
        id: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newColumn = await ctx.db.column.create({
        data: {
          id: input.id,
          name: input.name,
          tableId: input.tableId,
        },
      });

      const records = await ctx.db.record.findMany({
        where: { tableId: input.tableId },
      });

      if (records.length > 0) {
        await ctx.db.cell.createMany({
          data: records.map((record) => ({
            id: `${record.id}-${newColumn.id}`,
            recordId: record.id,
            columnId: newColumn.id,
            data: "",
          })),
        });
      }

      return newColumn;
    }),

    createRecord: protectedProcedure
    .input(z.object({ tableId: z.string().min(1), rowIndex: z.number().int(), id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const record = await ctx.db.record.create({
        data: {
          id: input.id,
          rowIndex: input.rowIndex,
          tableId: input.tableId,
        },
      });
    
      const columns = await ctx.db.column.findMany({
        where: { tableId: input.tableId },
      });
  
      await ctx.db.cell.createMany({
        data: columns.map(column => ({
          id: `${record.id}-${column.id}`,
          recordId: record.id,
          columnId: column.id,
          data: "",
        }))
      });
  
      // Return the complete record with its cells
      // return ctx.db.record.findUnique({
      //   where: { id: record.id },
      //   include: {
      //     cells: true
      //   }
      // });

      // return {
      //   ...record,
      //   cells: cells
      // }

      return record;
    }),
  
  // update cell
  updateCell: protectedProcedure
  .input(
    z.object({
      recordId: z.string().min(1),
      columnId: z.string().min(1),
      data: z.string().min(0),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const updatedCellValue = await ctx.db.cell.update({
      where: {
        recordId_columnId: {
          recordId: input.recordId,
          columnId: input.columnId,
        },
      },
      data: {
        data: input.data,
      },
    });
    return updatedCellValue;
  }),

  createDefaultTable: protectedProcedure
    .input(z.object({ baseId: z.string().min(1), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const table = await ctx.db.table.create({
        data: {
          baseId: input.baseId,
          name: input.name,
          records: {
            create: [{rowIndex: 0}, {rowIndex: 1}, {rowIndex: 2}],
          },
          columns: {
            create: [
              { name: "Name" },
              { name: "Notes" },
              { name: "Assignee" },
              { name: "Status" },
            ],
          },
          views: {
            create: {
              name: "Grid View",
              sortColumnId: "",
              sortOrder: "",
              filterColumnId: "",
              filterCond: "",
              filterValue: "",
            }
          }
        },
        include: {
          records: true,
          columns: true,
        }
      });
      const cells = [];
      for (const record of table.records as { id: string }[]) {
        for (const column of table.columns as { id: string }[]) {
          cells.push(
            ctx.db.cell.create({
              data: {
                recordId: record.id,
                columnId: column.id,
                data: "",
              }
            })
          );
        }
      }
      await Promise.all(cells);


      return {
        success: true,
        table,
      }

    }),

  getColumns: protectedProcedure
    .input(z.object({ tableId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.column.findMany({
        where: { tableId: input.tableId },
      });
    }),

  createFakeRecords: protectedProcedure
    .input(z.object({
      tableId: z.string().min(1), 
      columnIds: z.array(z.string().min(1)),
      seed: z.string().optional(),
      count: z.number().int().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const {tableId, columnIds, count = 500} = input;

      const currentCount = await ctx.db.record.count({
        where: { tableId },
      });

      const records = Array.from({ length: count }, (_, i) => ({
        id: `${tableId}-${i + currentCount}`,
        tableId: tableId,
        rowIndex: i + currentCount,
      }))

      const recordsData = records.flatMap((record) => 
        columnIds.map((columnId) => ({
          id: `${record.id}-${columnId}`,
          data: faker.person.fullName(),
          recordId: record.id,
          columnId: columnId,
        })),
      );

      const result = await ctx.db.$transaction(
        async (prisma) => {
          await prisma.record.createMany({
            data: records,
          });
          return await prisma.cell.createMany({
            data: recordsData,
          });
        },
        { timeout: 60000 },
      );
      return result;
    }),
  
  getSearchRecord: protectedProcedure
    .input(z.object({ searchInput: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.record.findFirst({
        where: {
          cells: {
            some: {
              data: {
                contains: input.searchInput,
              },
            },
          }
        },
        orderBy: {
          rowIndex: "asc",
        }
      });
    }),
  
  createView: protectedProcedure
    .input(
      z.object({ 
        tableId: z.string().min(1), name: z.string().min(1) 
      }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.view.create({
        data: {
          name: input.name,
          tableId: input.tableId,
          sortColumnId: "",
          sortOrder: "",
          filterColumnId: "",
          filterCond: "",
          filterValue: "",
        }
      })
    }),



  getTableView: protectedProcedure
    .input(z.object({ viewId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.view.findUnique({
        where: { id: input.viewId },
      });
    }),

  updateTableView: protectedProcedure
    .input(
      z.object({ 
        viewId: z.string().min(1), 
        sortColumnId: z.string(),
        sortOrder: z.string(),
        filterColumnId: z.string(),
        filterCond: z.string(),
        filterValue: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.view.update({
        where: { id: input.viewId },
        data: {
          sortColumnId: input.sortColumnId,
          sortOrder: input.sortOrder,
          filterColumnId: input.filterColumnId,
          filterCond: input.filterCond,
          filterValue: input.filterValue,
        }
      });
    }),


});