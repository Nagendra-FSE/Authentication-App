// ...existing code...
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Field,
  Stack
} from "@chakra-ui/react";
import type { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../lib/api";
// ...existing code...

const ForgotPassword: FC = () => {

  const [email, setEmail] = useState("");

   const {
        mutate: passwordChange,
        isPending,
        isError,
         error
    } = useMutation({
        mutationFn: forgotPassword,
        onSuccess: (s) => {
          console.log(s);
        }
    }) 

  return (
    <>
      <Flex minH="100vh" align="center" justify="center" bg="gray.50" p={4}>
        <Container maxW="md" bg="white" boxShadow="md" rounded="lg" py={8}>
          <Heading mb={6} size="lg" textAlign="center">
            Enter your email and get password reset link
          </Heading>

          <Box as="form">
            <Stack gap="8" maxW="sm" css={{ "--field-label-width": "96px" }}>
              <Field.Root id="email" invalid={isError}>
                <Field.Label>Email address</Field.Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                 <Field.ErrorText>{error?.message}</Field.ErrorText>
              </Field.Root>

              <Button
                type="button"
                loadingText="Signing in"
                size="md"
                width="full"
                disabled={!email}
                loading={isPending}
                onClick={() => passwordChange(email)}
              >
                Change Password
              </Button>

            </Stack>
          </Box>
        </Container>
      </Flex>
    </>
  );
};

export default ForgotPassword;
