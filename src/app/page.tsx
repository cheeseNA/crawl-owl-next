"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import { TaskTable } from "@/components/TaskTable";
import { CreateTaskModal } from "@/components/CreateTaskModal";
import { useGetTasks } from "@/hooks/queries";
import client from "@/lib/api";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const tasks = useGetTasks({});

  const onTrashClick = async (id: string) => {
    try {
      await client.DELETE("/tasks/{taskId}", {
        params: { path: { taskId: id } },
      });
      tasks.refetch();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <main>
      <div className="flex flex-col">
        <div className="py-4 flex justify-between items-center">
          <p className="font-semibold text-inherit text-lg">Tasks</p>
          <Button onPress={onOpen} color="primary">
            Create
          </Button>
        </div>
        <TaskTable tasks={tasks} onTrashClick={onTrashClick} />
        <CreateTaskModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
    </main>
  );
}
