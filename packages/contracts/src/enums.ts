export const Role = {
  VISITOR: 'VISITOR',
  COLLABORATOR: 'COLLABORATOR',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const AppointmentStatus = {
  PENDING: 'PENDING',
  REVIEWING: 'REVIEWING',
  CONFIRMED: 'CONFIRMED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED',
} as const;
export type AppointmentStatus = (typeof AppointmentStatus)[keyof typeof AppointmentStatus];

export const ContentStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
} as const;
export type ContentStatus = (typeof ContentStatus)[keyof typeof ContentStatus];

export const Locale = {
  FR: 'fr',
  EN: 'en',
} as const;
export type Locale = (typeof Locale)[keyof typeof Locale];
