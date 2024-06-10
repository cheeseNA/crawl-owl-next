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

  const onSubmit: SubmitHandler<components["schemas"]["TaskRequest"]> = (
    data
  ) => {
    data.duration_day = Number(data.duration_day); // TODO: use better approach, error handling
    console.log(data);
  };

  const onCreate = async (e: FormEvent) => {
    handleSubmit(onSubmit)(e);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onOpenChange();
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
              {/* <Input
                autoFocus
                // endContent={
                //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                // }
                label="Email"
                placeholder="Enter your email"
                description="We'll never share your email with anyone else."
                variant="bordered"
                isRequired
              /> */}
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
