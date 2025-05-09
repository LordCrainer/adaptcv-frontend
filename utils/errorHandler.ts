interface ErrorHandler {
  name: string
  message: string
  statusCode: number
  statusText: string
  stack?: string
}

export default (error: ErrorHandler) => {
  if (error.name === 'invalid_token') {
  }
  return 'Hello Util'
}
