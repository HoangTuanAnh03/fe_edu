"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CreateBody, CreateBodyType } from "@/schemaValidations/level.schema";
import { useState, useRef, useMemo } from "react";
import { Plus, Upload, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCreateLevelMutation } from "@/queries/useLevel";
import { useUploadLevelMutation } from "@/queries/useMedia";
import { LevelResponse } from "@/types/level";

// ({
//   id,
//   setId,
// }: {
//   id: number | undefined,
//   setId: (value: number | undefined) => void
// })

const DetailForm =  
({
    open,
    setOpen,
    id
  }: {
    open: boolean;
    setOpen: (value: boolean) => void;
    id: number | undefined
  })  => {
  const { toast } = useToast();
  const createTopicMutation = useCreateLevelMutation();
  const uploadLevelImageMutation = useUploadLevelMutation();
  const [file, setFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  // const [openDetail, setOpenDetail] = useState<boolean>(open);


  const form = useForm<CreateBodyType>({
    resolver: zodResolver(CreateBody),
    mode: "all",
    defaultValues: {
      name: "",
      image: "",
    },
  });

  const image = form.watch("image");
  const name = form.watch("name");

  const previewImage = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return image;
  }, [image, file]);

  // 2. Define a submit handler.
  async function onSubmit(values: CreateBodyType) {
    if (createTopicMutation.isPending) return;

    try {
      let body = values;
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const res = await uploadLevelImageMutation.mutateAsync(formData);
        const imgUrl = res.payload.data?.fileName[0] ?? "";
        body = { ...values, image: imgUrl };
      }
      const result = await createTopicMutation.mutateAsync(body);

      if (result.payload.code === 200) {
        reset();
        toast({ description: "Tạo mới Topic thành công" });
      } else if (result.payload.code === 409) {
        form.setError("name", {
          type: "custom",
          message: "Topic name existed",
        });
      }
    } catch (error) {}
  }

  const reset = () => {
    form.reset();
    setFile(null);
    // setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-normal">
          <Plus />
          Detail Level
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New topic</DialogTitle>
          <DialogDescription>
            Make more topics here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex-shrink-0 w-full"
            noValidate
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <abbr className="text-red-600">*</abbr>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-11"
                      placeholder="Name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <div className="flex gap-2 items-start justify-start">
                    {previewImage && (
                      <div>
                        <Avatar className="aspect-square w-[100px] h-[100px] rounded-md object-cover relative group">
                          <AvatarImage src={previewImage} />
                          <AvatarFallback className="rounded-none">
                            {name}
                          </AvatarFallback>
                          <div className="w-[100px] h-[100px] absolute bg-[#f5c9ce] bg-opacity-50  items-center justify-center hidden group-hover:flex">
                            <button
                              className="bg-[#ED1B2F] hover:bg-[#c83333] rounded-full"
                              onClick={() => setFile(null)}
                            >
                              <X color="white" />
                            </button>
                          </div>
                        </Avatar>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={imageInputRef}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFile(file);
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="flex aspect-square w-[100px] h-[100px] items-center justify-center rounded-md border border-muted bg-transparent hover:bg-accent hover:text-accent-foreground"
                      onClick={() => imageInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Upload</span>
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <Button
                type="submit"
                className=" bg-[#ED1B2F] hover:bg-[#c83333]"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DetailForm;
