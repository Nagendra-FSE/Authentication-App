// ...existing code...
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
Checkbox,
  Container,
  Flex,
  Heading,
  Input,
  Field,
  Link as ChakraLink,
  Text,
  Stack
} from "@chakra-ui/react";
import type { FC, KeyboardEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword, login } from "../lib/api";
// ...existing code...

const Login: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [showPassword, setShowPassword] = useState(false);

    const {
        mutate: signin,
        isPending,
        isError,
         error
    } = useMutation({
        mutationFn: login,
        onSuccess: () => {
          navigate("/", {replace: true})
        }
    }) 

  return (
    <>
      <Flex minH="100vh" align="center" justify="center" bg="gray.50" p={4}>
        <Container maxW="md" bg="white" boxShadow="md" rounded="lg" py={8}>
          <Heading mb={6} size="lg" textAlign="center">
            Sign into your account
          </Heading>

          <Box as="form">
            <Stack gap="8" maxW="sm" css={{ "--field-label-width": "96px" }}>
              <Field.Root id="email" invalid={isError && error?.message.includes("email")}>
                <Field.Label>Email address</Field.Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                />
                 <Field.ErrorText>{error?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root id="password" invalid={isError && error?.message.includes("password")}>
                <Field.Label>Password</Field.Label>

                  <Input
                    type={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        signin({ email, password });
                      }
                    }}
                  />
               <Field.ErrorText>{error?.message}</Field.ErrorText>
              </Field.Root>
       

              <Flex align="center" justify="space-between">
                <Checkbox.Root>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>Remember me</Checkbox.Label>
                </Checkbox.Root>
                  <Link to="/forgot/password">
                  Forgot password?
                    </Link>
              </Flex>

              <Button
                type="button"
                loadingText="Signing in"
                size="md"
                width="full"
                disabled={!email || !password}
                loading={isPending}
                onClick={() => signin({email, password})}
              >
                Sign in
              </Button>

              <Text textAlign="center" fontSize="sm" color="gray.600">
                Don't have an account?{" "}
                <Link to="/register">
                  Create one
                </Link>
              </Text>
            </Stack>
          </Box>
        </Container>
      </Flex>
    </>
  );
};

export default Login;
