// utils/errorMessages.ts
export const errorMessages: Record<number, string> = {
  400: 'Bad request',
  401: 'Unauthorized',
  403: 'Access denied',
  404: 'Resource not found',
  500: 'Internal server error'
}

export const errorNames: Record<string, string> = {
  notFound: 'Resource not found',
  invalidToken: 'Session expired. Please log in again.',
  unauthorized: 'You are not authorized to perform this action.'
}
