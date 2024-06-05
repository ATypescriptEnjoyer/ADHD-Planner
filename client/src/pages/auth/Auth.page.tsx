import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Alert,
} from "@mantine/core";
import classes from "./Auth.module.css";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { password } from "app/validators";
import { AuthResponse, auth } from "app/api";
import { useLocalStorage } from "@mantine/hooks";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Auth = (): JSX.Element => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [token, setToken] = useLocalStorage<AuthResponse>({ key: "session" });
  const [errors, setErrors] = useState<string>();
  const navigate = useNavigate();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    validate: {
      firstName: (value) =>
        isLogin || value.length > 0 ? null : "First Name is required.",
      lastName: (value) =>
        isLogin || value.length > 0 ? null : "Last Name is required.",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        password(value, {
          minLength: 8,
          maxLength: 32,
          specialCharacter: true,
          uppercase: true,
        }),
    },
  });

  const submitForm = async (values: typeof form.values) => {
    try {
      const response = await (isLogin
        ? auth.login(values.email, values.password)
        : auth.register(
            values.firstName,
            values.lastName,
            values.email,
            values.password
          ));

      setToken(response);
      navigate("/app");
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(error.response?.data.message);
      } else {
        setErrors((error as Error).message);
      }
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to ADHD Planner
        </Title>

        <form onSubmit={form.onSubmit(submitForm)}>
          {!isLogin && (
            <TextInput
              label="First Name"
              placeholder="Jane"
              size="md"
              pb="sm"
              key={form.key("firstName")}
              {...form.getInputProps("firstName")}
            />
          )}
          {!isLogin && (
            <TextInput
              label="Last Name"
              placeholder="Doe"
              size="md"
              pb="sm"
              key={form.key("lastName")}
              {...form.getInputProps("lastName")}
            />
          )}
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            pb="sm"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            size="md"
            pb="sm"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          {!!errors && (
            <Alert title="Error!" color="red" mt="md">
              {errors}
            </Alert>
          )}
          {/* <Checkbox label="Keep me logged in" mt="xl" size="md" /> */}
          <Button fullWidth mt="xl" size="md" type="submit">
            {isLogin ? "Login" : "Register"}
          </Button>
        </form>

        <Text ta="center" mt="md">
          {isLogin ? "Don't have an account?" : "Have an account?"}
          <Anchor<"a">
            fw={700}
            onClick={(event) => {
              event.preventDefault();
              setErrors("");
              setIsLogin(!isLogin);
            }}
          >
            {isLogin ? " Register" : " Sign In"}
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
};
