import { useState, type JSX , type KeyboardEvent} from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {

  Container,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  Field,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../lib/api";

const ResetPassword = (): JSX.Element => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const code: string | null = searchParams.get("code");
    // const exp: number = Number(searchParams.get("exp"));
    // const time = new Date(exp).getTime;
    const [password, setPassword] = useState("");  
    // const [showPassword, setShowPassword] = useState(false);

     const {
          mutate: resetHandler,
          isPending,
          isError,
           error
      } = useMutation({
          mutationFn: resetPassword,
          onSuccess: () => {
            navigate("/login")
          },
          onError: () => {
            navigate("/forgot/password")
          }
      }) 

  if (!code) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="gray.50" p={4}>
        <Container maxW="md" bg="white" boxShadow="md" rounded="lg" py={8}>
          <Heading size="lg" mb={4} textAlign="center">
            Invalid verification link
          </Heading>
          <Text mb={6} textAlign="center" color="gray.600">
            The verification code is missing. Please use the link from your email or request a new reset link.
          </Text>
          <VStack gap={3}>
            <Button onClick={() => navigate("/")} width="full">
              Go to home
            </Button>
          </VStack>
        </Container>
      </Flex>
    );
  }

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" p={4}>
      <Container maxW="md" bg="white" boxShadow="md" rounded="lg" py={8}>
        <Heading size="lg" mb={4} textAlign="center">
        Please Reset you password; Link will expiry in
        </Heading>  
         <Stack gap="8" maxW="sm" css={{ "--field-label-width": "96px" }}>
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
                                resetHandler({ code, password });
                              }
                            }}
                          />
                       <Field.ErrorText>{error?.message}</Field.ErrorText>
                      </Field.Root>

                         <Button
                                      type="button"
                                      loadingText="Reset password"
                                      size="md"
                                      width="full"
                                      disabled={!password}
                                      loading={isPending}
                                      onClick={() => resetHandler({code, password})}
                                    >
                                      Reset Password
                                    </Button>
                                    </Stack>
      </Container>
    </Flex>
  );
};

export default ResetPassword;
// ...existing code...