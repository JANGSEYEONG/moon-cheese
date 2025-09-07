import { Center, styled, VStack } from 'styled-system/jsx';
import { Button, Text } from '@/ui-lib';
import { useNavigate } from 'react-router';

function InvalidPageSection() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <Center p={5} minH="calc(100vh - 56px)" bgColor="background.01_white">
      <VStack gap={4}>
        <VStack gap={2} textAlign="center">
          <styled.img src="/error-image.png" alt="invalid page" w={100} />

          <Text variant="B2_Bold">잘못된 페이지 접근입니다</Text>
          <Text variant="C2_Regular">{'요청하신 페이지를 찾을 수 없어요.\n홈으로 돌아가서 다시 시도해주세요.'}</Text>
        </VStack>
        <Button onClick={goHome}>홈으로 가기</Button>
      </VStack>
    </Center>
  );
}

export default InvalidPageSection;
