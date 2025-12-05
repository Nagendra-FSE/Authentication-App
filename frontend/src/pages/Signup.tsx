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
  IconButton,
  Input,
  Field,
  FieldErrorText,
  Text,
  Stack,
  InputElement
} from "@chakra-ui/react";
import type { FC, KeyboardEvent} from "react"; 
import { useMutation } from "@tanstack/react-query";
import { register } from "../lib/api";
// ...existing code...

const Login: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setCnfPassword] = useState<string>("");
  // const [showPassword, setShowPassword] = useState<boolean>(false);

 const {
    mutate: signup,
    isPending,
    isError,
    error 
    } = useMutation({
          mutationFn: register,
          onSuccess: () => {
            navigate("/", {replace: true})
          }
      })


  return (
    <>
      <Flex minH="100vh" align="center" justify="center" bg="gray.50" p={4}>
        <Container maxW="md" bg="white" boxShadow="md" rounded="lg" py={8}>
          <Heading mb={6} size="lg" textAlign="center">
            Create your account
          </Heading>

          <Box as="form">
            <Stack gap="8" maxW="sm" css={{ "--field-label-width": "96px" }}>
              <Field.Root id="email" invalid={isError}>
                <Field.Label>Email address</Field.Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                />
                <FieldErrorText>{error?.message}</FieldErrorText>
              </Field.Root>

              <Field.Root id="password" invalid={isError}>
                <Field.Label>Password</Field.Label>

                  <Input
                    type={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
          
                <FieldErrorText>{error?.message}</FieldErrorText>
              </Field.Root>

                   <Field.Root id="confirmPassword" invalid={isError}>
                <Field.Label>Confirm Password</Field.Label>

                  <Input
                    type={"password"}
                    value={confirmPassword}
                    onChange={(e) => setCnfPassword(e.target.value)}
                    placeholder="Confirm your password"
                    autoComplete="current-password"
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                                          if (e.key === "Enter") {
                                            e.preventDefault();
                                            signup({email, password, confirmPassword})
                                          }
                                        }}
                  />
          
                <FieldErrorText>{error?.message}</FieldErrorText>
              </Field.Root>


              <Button
                type="button"
                loadingText="Signing in"
                 disabled={!email || password.length < 8 || confirmPassword.length < 8}
                size="md"
                width="full"
                loading={isPending}
                onClick={() => signup({email, password, confirmPassword})}
              >
                Register
              </Button>

              <Text textAlign="center" fontSize="sm" color="gray.600">
               Already an account?{" "}
                <Link to="/login">
                  Signin
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
