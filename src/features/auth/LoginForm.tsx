import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginAsync } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hook";
import { Button } from "../../components/ui/shad-cn/button";
import {
  FormInput,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/shad-cn/form";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const methods = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(loginAsync(data));
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <FormProvider {...methods}>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[400px]">
            <FormField
              name="username"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormInput
                    {...field}
                    required
                    inputProps={{ className: "w-full" }}
                    label="Введите логин"
                  />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormInput
                    {...field}
                    required
                    className="mt-[14px]"
                    inputProps={{
                      className: "w-full",
                      type: "password",
                    }}
                    label="Введите пароль"
                  />
                </FormItem>
              )}
            />
            <Button
              variant={"default"}
              size={"lg"}
              type="submit"
              disabled={loading}
              className="w-[400px] mt-[24px]"
            >
              {loading ? "Войти ..." : "Войти"}
            </Button>
            {error && (
              <FormMessage>
                {typeof error === "string" ? error : JSON.stringify(error)}
              </FormMessage>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
