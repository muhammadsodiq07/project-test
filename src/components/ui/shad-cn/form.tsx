import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useController,
  useFormContext,
} from "react-hook-form";

import { className as classN, className } from "../../utils/className";
import { Label } from "./label";
import { Input, InputProps } from "./input";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        ref={ref}
        className={classN({
          "space-y-2": true,
          [className as string]: !!className,
        })}
        {...props}
      />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { formItemId } = useFormField();

  return (
    <Label ref={ref} className={className} htmlFor={formItemId} {...props} />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={classN({
        "text-[0.8rem] text-muted-foreground": true,
        [className as string]: !!className,
      })}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={classN({
        "text-[0.8rem] font-medium text-destructive": true,
        [className as string]: !!className,
      })}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

const FormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: Pick<ControllerProps<TFieldValues, TName>, "control" | "name"> & {
  inputProps?: InputProps;
  label?: React.ReactNode;
  required?: boolean;
  className?: string;
  autoFocus?: boolean;
  endIcon?: React.ReactNode;
}) => {
  const { field, fieldState } = useController({
    control: props.control,
    name: props.name,
  });

  return (
    <FormItem
      className={className({ [props.className || ""]: true, relative: true })}
    >
      {props.label && (
        <FormLabel>
          {props.label}
          {props.required && <span className="text-required_red">*</span>}
          {fieldState?.error && (
            <span className="text-required_red font-normal text-[12px] ml-auto">
              Обязательное поле
            </span>
          )}
        </FormLabel>
      )}
      <FormControl>
        <Input
          {...field}
          autoFocus={props?.autoFocus}
          onChange={
            props.inputProps?.type === "number"
              ? (event) =>
                  field.onChange({
                    ...event,
                    target: { ...event.target, value: +event.target.value },
                  })
              : field.onChange
          }
          {...props.inputProps}
          className={classN({
            "!border-required_red": !!fieldState.error,
            [props.inputProps?.className || ""]: true,
          })}
        />
      </FormControl>
      {props.endIcon && (
        <span className="absolute right-4 bottom-4">{props.endIcon}</span>
      )}
    </FormItem>
  );
};

export type IOption = {
  value: string;
  label: React.ReactNode;
};

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  FormInput,
};
