import { Text } from '@/ui-lib';
import { Divider, Flex, HStack, Stack } from 'styled-system/jsx';

function PriceSummaryRoot({ children }: { children: React.ReactNode }) {
  return <Stack gap={5}>{children}</Stack>;
}

interface PriceSummaryLineProps {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
}

function PriceSummaryLine({ label, value, highlight }: PriceSummaryLineProps) {
  return (
    <Flex justify="space-between">
      <Text variant="B2_Regular">{label}</Text>
      <Text variant="B2_Bold" color={highlight ? 'state.green' : undefined}>
        {value}
      </Text>
    </Flex>
  );
}

function PriceSummaryTotal({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <HStack justify="space-between">
      <Text variant="H2_Bold">{label}</Text>
      <Text variant="H2_Bold">{value}</Text>
    </HStack>
  );
}

function PriceSummaryDivider() {
  return <Divider color="border.01_gray" />;
}

const PriceSummary = {
  Root: PriceSummaryRoot,
  Line: PriceSummaryLine,
  Total: PriceSummaryTotal,
  Divider: PriceSummaryDivider,
};

export default PriceSummary;
