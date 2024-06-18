"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Checkbox,
  Link,
  Button,
  Textarea,
} from "@nextui-org/react";
import type { components } from "@/lib/schema";
import { FormEvent } from "react";
import client from "@/lib/api";
import React from "react";

// TODO: validation ref: https://github.com/nextui-org/nextui/issues/1969#issuecomment-1815785527

export const CreateTaskModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<components["schemas"]["TaskRequest"]>();

  const [success, setSuccess] = React.useState(false);

  const onSubmit = async (data: components["schemas"]["TaskRequest"]) => {
    data.duration_day = Number(data.duration_day); // TODO: use better approach, error handling
    console.log(data);
    try {
      await client.POST("/tasks", { body: data });
    } catch (error) {
      console.error(error);
      return;
    }
    setSuccess(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSuccess(false);
  };

  const onCreate = async (e: FormEvent) => {
    await handleSubmit(onSubmit)(e);
    onOpenChange();
    window.location.reload();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <form onSubmit={onCreate}>
            <ModalHeader className="flex flex-col gap-1">
              Create Task
            </ModalHeader>
            <ModalBody>
              <Input
                label="Site URL"
                type="url"
                placeholder="https://example.com"
                variant="bordered"
                isRequired
                {...register("site_url", { required: true })}
              />
              <Input
                label="Trigger duration"
                type="number"
                placeholder="1"
                endContent={
                  <span className="text-default-400 text-small">day</span>
                }
                variant="bordered"
                isRequired
                {...register("duration_day", { required: true, min: 1 })}
              />
              <Textarea
                label="Trigger condition"
                placeholder="価格が5000円以下の商品が追加されたら"
                variant="bordered"
                isRequired
                {...register("condition_query", { required: true })}
              />
              <div className="flex py-2 px-1 justify-between">
                <Checkbox
                  classNames={{
                    label: "text-small",
                  }}
                  {...register("is_public")}
                >
                  Public
                </Checkbox>
              </div>
              {success && (
                <div className="bg-success-100 text-success rounded-medium p-2">
                  Task Created Successfully.
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" type="submit">
                Create
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};
