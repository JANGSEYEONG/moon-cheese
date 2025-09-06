import { Center, styled, VStack } from 'styled-system/jsx';

function LoadingSection() {
  return (
    <Center p={5} aspectRatio={1} bgColor="background.01_white">
      <VStack gap={4}>
        <VStack gap={2} textAlign="center">
          <styled.div
            w={10}
            h={10}
            border="4px solid"
            borderColor="gray.200"
            borderTopColor="primary.01_primary"
            borderRadius="50%"
            animation="spin 1s linear infinite"
          />
        </VStack>
      </VStack>
    </Center>
  );
}

export default LoadingSection;
