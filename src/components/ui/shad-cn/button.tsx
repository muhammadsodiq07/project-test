import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import LoadingIcon from "../../assets/svg/LoadingIcon";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "flex items-center justify-center disabled:pointer-events-none disabled:opacity-50 text-[14px] font-bold leading-[150%] w-full",
  {
    variants: {
      variant: {
        default: "bg-red-primary hover:bg-hover-red text-light",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-gray-300 text-dark_two hover:bg-gray-200",
        ghost: "",
        link: "text-red-primary hover:underline font-[400]",
        warning: "bg-[#FFF9EB] text-[#FEB701]",
        info: "bg-[#EBF9FF] text-[#01B2FE]",
      },
      size: {
        default: "py-[16px] px-[24px] rounded-[14px]",
        sm: "py-2 px-3.5 rounded-lg text-sm font-normal",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        link: "p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loading && (
          <LoadingIcon className="w-[20px] h-[20px] mr-[5px] stroke-light" />
        )}
        {props.children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
