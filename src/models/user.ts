/* 회원 등급 */
export const GRADE = {
  EXPLORER: 'EXPLORER',
  PILOT: 'PILOT',
  COMMANDER: 'COMMANDER',
} as const;
export type Grade = 'EXPLORER' | 'PILOT' | 'COMMANDER';

export const GRADE_LABEL: Record<Grade, string> = {
  EXPLORER: 'Explorer',
  PILOT: 'Pilot',
  COMMANDER: 'Commander',
};
