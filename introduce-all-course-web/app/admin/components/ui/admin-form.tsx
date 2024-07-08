import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { cn } from "@/app/utils/common";

import { AdminLabel as Label } from "./admin-label";

const AdminForm = FormProvider;

type AdminFormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const AdminFormFieldContext = React.createContext<AdminFormFieldContextValue>(
  {} as AdminFormFieldContextValue
);

const AdminFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <AdminFormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </AdminFormFieldContext.Provider>
  );
};

const useAdminFormField = () => {
  const fieldContext = React.useContext(AdminFormFieldContext);
  const itemContext = React.useContext(AdminFormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useAdminFormField should be used within <AdminFormField>");
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

type AdminFormItemContextValue = {
  id: string;
};

const AdminFormItemContext = React.createContext<AdminFormItemContextValue>(
  {} as AdminFormItemContextValue
);

const AdminFormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <AdminFormItemContext.Provider value={{ id }}>
      <div
        ref={ref}
        className={cn("space-y-2 transition-all", className)}
        {...props}
      />
    </AdminFormItemContext.Provider>
  );
});
AdminFormItem.displayName = "AdminFormItem";

const AdminFormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useAdminFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
AdminFormLabel.displayName = "AdminFormLabel";

const AdminFormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useAdminFormField();

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
AdminFormControl.displayName = "AdminFormControl";

const AdminFormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useAdminFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
AdminFormDescription.displayName = "AdminFormDescription";

const AdminFormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useAdminFormField();
  const body = error ? String(error?.message) : children;

  return (
    <AnimatePresence>
      {body && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p
            ref={ref}
            id={formMessageId}
            className={cn(
              "text-sm font-medium text-destructive transition-all duration-300",
              className
            )}
            {...props}
          >
            {body}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
AdminFormMessage.displayName = "AdminFormMessage";

export {
  AdminForm,
  AdminFormControl,
  AdminFormDescription,
  AdminFormField,
  AdminFormItem,
  AdminFormLabel,
  AdminFormMessage,
  useAdminFormField,
};
