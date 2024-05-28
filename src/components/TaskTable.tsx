"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  ChipProps,
  Skeleton,
} from "@nextui-org/react";
import { TrashIcon } from "@/heroicons/trash";
import { useGetTasks } from "@/hooks/queries";

const columns = [
  { name: "TARGET SITE", uid: "site_url" },
  { name: "ACCESS", uid: "is_public" },
  { name: "SPAN", uid: "duration_day" }, // TODO: use duration
  { name: "LAST CHECK", uid: "updated_at" }, // TODO: use last check date
  { name: "ACTIONS", uid: "actions" },
];

import type { components } from "@/lib/schema";
type TaskResponse = components["schemas"]["TaskResponse"];

export const TaskTable = () => {
  const tasks = useGetTasks({});

  const renderCell = (columnKey: string, task: TaskResponse) => {
    const cellValue = task[columnKey as keyof typeof task];
    switch (columnKey) {
      case "site_url":
        return <div>{cellValue}</div>;
      case "is_public":
        return (
          <Chip className="capitalize" color="default" size="sm" variant="flat">
            {task["is_public"] ? "PUBLIC" : "PRIVATE"}
          </Chip>
        );

      case "duration_day":
        return <div>{cellValue} day</div>;
      case "updated_at":
        return <div>{cellValue}</div>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="danger" content="Delete task">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <TrashIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  if (tasks.isLoading) {
    return (
      <Table aria-label="Task table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              {(_) => (
                <TableCell>
                  <Skeleton className="h-4 w-full rounded-lg" />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  return (
    <Table aria-label="Task table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={tasks.data}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(columnKey as string, item)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
