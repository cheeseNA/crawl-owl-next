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
import { PauseIcon } from "@/heroicons/pause";
import { FilledPauseIcon } from "@/heroicons/filledpause";
import type { components } from "@/lib/schema";
import { UseQueryResult } from "@tanstack/react-query";
type TaskResponse = components["schemas"]["TaskResponse"];

const columns = [
  { name: "TARGET SITE", uid: "site_url" },
  { name: "QUERY", uid: "condition_query" },
  { name: "ACCESS", uid: "is_public" },
  { name: "SPAN", uid: "duration_day" }, // TODO: use duration
  { name: "LAST CHECK", uid: "last_crawled_at" }, // TODO: use last check date
  { name: "ACTIONS", uid: "actions" },
];

export const TaskTable = ({
  tasks,
  onTrashClick,
}: {
  tasks: UseQueryResult<TaskResponse[] | undefined, Error>;
  onTrashClick: (id: string) => Promise<void>;
}) => {
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
      case "condition_query":
        return <div>{cellValue}</div>;
      case "duration_day":
        return <div>{cellValue} day</div>;
      case "last_crawled_at":
        if (!cellValue) return <div>Not checked yet</div>;
        return <div>{cellValue}</div>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip
              color="primary"
              content={task.is_paused ? "Resume" : "Pause"}
            >
              <span className="text-lg cursor-pointer active:opacity-50">
                {task.is_paused ? <FilledPauseIcon /> : <PauseIcon />}
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete task">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <button onClick={() => onTrashClick(task.id)}>
                  <TrashIcon />
                </button>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  if (tasks.isPending) {
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
