"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import { TaskTable } from "@/components/TaskTable";
import { CreateTaskModal } from "@/components/CreateTaskModal";
import { useGetTasksOfUser } from "@/hooks/queries";
import client from "@/lib/api";
import { useUser } from "@/hooks/useUser";
import type { components } from "@/lib/schema";

export default function MyPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useUser();
  const tasks = useGetTasksOfUser({
    params: { path: { userId: user?.uid || "" } },
    reactQuery: { enabled: !!user && !!user.uid },
  });
  console.log(user);
  console.log(tasks);

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
        {user ? (
          <div>
            <div className="py-4 flex justify-between items-center">
              <p className="font-semibold text-inherit text-lg">Tasks</p>
              <Button onPress={onOpen} color="primary">
                Create
              </Button>
            </div>
            <TaskTable tasks={tasks} onTrashClick={onTrashClick} />
          </div>
        ) : (
          <div className="pt-4 flex justify-center items-center">
            <div className="text-lg text-gray-500">
              Please log in to see your tasks.
            </div>
          </div>
        )}
        <CreateTaskModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
    </main>
  );
}
