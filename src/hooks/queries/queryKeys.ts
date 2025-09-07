// TODO: 도메인 구조 정리 필요
export const queryKeys = {
  all: () => ['queries'] as const,
  exchangeRate: {
    all: () => [...queryKeys.all(), 'exchangeRate'] as const,
  },
  me: {
    all: () => [...queryKeys.all(), 'me'] as const,
  },
  gradePoint: {
    all: () => [...queryKeys.all(), 'gradePoint'] as const,
  },
  product: {
    all: () => [...queryKeys.all(), 'product'] as const,
    list: () => [...queryKeys.product.all(), 'list'] as const,
    recentList: () => [...queryKeys.product.all(), 'recentList'] as const,
  },
};
