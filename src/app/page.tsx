"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import { TaskTable } from "@/components/TaskTable";
import { CreateTaskModal } from "@/components/CreateTaskModal";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <main>
      <div className="flex flex-col">
        <div className="py-4 flex justify-between items-center">
          <p className="font-semibold text-inherit text-lg">Tasks</p>
          <Button onPress={onOpen} color="primary">
            Create
          </Button>
        </div>
        <TaskTable />
        <CreateTaskModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
    </main>
  );
}
