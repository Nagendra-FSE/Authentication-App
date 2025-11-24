// ...existing code...
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { useParams, useNavigate,  Link as RouterLink } from "react-router-dom";
import { verifyEmailCode } from "../lib/api";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Spinner,
  Button,
  VStack,
} from "@chakra-ui/react";

const VerifyEmail: FC = () => {
  const { code } = useParams<{ code?: string }>();
  const navigate = useNavigate();

  const {
    data,
    isPending,
    isError,
    isSuccess,
    error
  } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmailCode(code!),
  });

  if (!code) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="gray.50" p={4}>
        <Container maxW="md" bg="white" boxShadow="md" rounded="lg" py={8}>
          <Heading size="lg" mb={4} textAlign="center">
            Invalid verification link
          </Heading>
          <Text mb={6} textAlign="center" color="gray.600">
            The verification code is missing. Please use the link from your email or request a new verification email.
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
          Verify your email
        </Heading>

        <Box>
          {isPending ? (
            <VStack gap={4} align="center">
              <Spinner size="lg" />
              <Text color="gray.600">Verifying your email — please wait...</Text>
            </VStack>
          ) : isError ? (
            <VStack gap={4} align="stretch">
          
                {(error as any)?.message ?? "Verification failed. Please try again."}
          

              <Button width="full">
                Retry
              </Button>

              <Button variant="outline" onClick={() => navigate("/resend-verification")} width="full">
                Resend verification email
              </Button>

              <Button onClick={() => navigate("/login")} width="full">
                Go to sign in
              </Button>
            </VStack>
          ) : isSuccess ? (
            <VStack gap={4} align="stretch">
           
          
                {(data as any)?.message ?? "Your email has been verified successfully."}
         

              <Button colorScheme="brand" onClick={() => navigate("/login")} width="full">
                Sign in
              </Button>

              <Button variant="ghost" onClick={() => navigate("/")} width="full">
                Back to home
              </Button>
            </VStack>
          ) : (
            <Text color="gray.600">Preparing verification...</Text>
          )}
        </Box>
      </Container>
    </Flex>
  );
};

export default VerifyEmail;
// ...existing code...