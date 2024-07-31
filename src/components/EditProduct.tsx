import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import {
  fetchProductByIdAsync,
  updateProductAsync,
} from "../features/items/itemsSlice";
import { Button } from "./ui/shad-cn/button";
import { useNavigate, useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { FormField, FormInput, FormItem } from "./ui/shad-cn/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().min(0, "Price must be greater than 0"),
  thumbnail: z.string().url("Invalid URL").min(1, "Thumbnail URL is required"),
});

type FormValues = z.infer<typeof schema>;

const EditProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const product = useAppSelector((state) =>
    state.items.items.find((item) => item.id === parseInt(id || "", 10))
  );

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: product?.title || "",
      price: product?.price || 0,
      thumbnail: product?.thumbnail || "",
    },
  });

  useEffect(() => {
    product &&
      methods.reset({
        title: product?.title || "",
        price: product?.price || 0,
        thumbnail: product?.thumbnail || "",
      });
  }, [methods, product]);

  const { handleSubmit } = methods;

  useEffect(() => {
    if (!product && id) {
      dispatch(fetchProductByIdAsync(parseInt(id)));
    }
  }, [dispatch, id, product]);

  const onSubmit = async (data: FormValues) => {
    const productId = parseInt(id || "", 10);

    if (isNaN(productId)) return;

    await dispatch(updateProductAsync({ id: productId, ...data }));
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-blue-primary font-[700] text-[28px] mb-4">
        Редактировать Продукт
      </h2>
      <FormProvider {...methods}>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[400px]">
            <FormField
              name="title"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormInput
                    {...field}
                    required
                    inputProps={{ className: "w-full" }}
                    label="Название"
                  />
                </FormItem>
              )}
            />
            <FormField
              name="price"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormInput
                    {...field}
                    required
                    className="mt-[14px]"
                    inputProps={{
                      className: "w-full",
                      type: "number",
                    }}
                    label="Цена"
                  />
                </FormItem>
              )}
            />
            <FormField
              name="thumbnail"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormInput
                    {...field}
                    required
                    className="mt-[14px]"
                    inputProps={{
                      className: "w-full",
                      type: "url",
                    }}
                    label="Изображение URL"
                  />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant={"ghost"}
              className="bg-blue-primary text-light w-full py-[10px] rounded-[6px] mt-[14px]"
            >
              Сохранить
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditProduct;
