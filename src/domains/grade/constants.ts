/* 회원 등급 */
export const GRADE = {
  EXPLORER: 'EXPLORER',
  PILOT: 'PILOT',
  COMMANDER: 'COMMANDER',
} as const;
export type Grade = (typeof GRADE)[keyof typeof GRADE];

export const GRADE_LABEL: Record<Grade, string> = {
  [GRADE.EXPLORER]: 'Explorer',
  [GRADE.PILOT]: 'Pilot',
  [GRADE.COMMANDER]: 'Commander',
} as const;
