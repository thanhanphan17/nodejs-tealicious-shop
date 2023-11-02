import StatusCodes from './statusCode'
import ReasonPhrases from './reasonPhrases'

export class BaseError extends Error {
  statusCode: number
  errors: string
  isOperational: any

  /**
   * Creates an instance of the class with the given parameters.
   *
   * @param {string | undefined} message - The error message.
   * @param {any} status - The status of the error.
   * @param {any} errors - The errors associated with the error.
   * @param {any} isOperational - Indicates if the error is operational.
   */
  constructor(message: string | undefined, status: any, errors: any, isOperational: any) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.statusCode = status
    console.log('this.statusCode::', this.statusCode)
    this.errors = errors
    this.isOperational = isOperational
    Error.captureStackTrace(this, this.constructor)
  }
}

export class API409Error extends BaseError {
  constructor(message = ReasonPhrases.CONFLICT, errors = [], status = StatusCodes.CONFLICT, isOperational = true) {
    super(message, status, errors, isOperational)
  }
}

export class API403Error extends BaseError {
  constructor(message = ReasonPhrases.FORBIDDEN, errors = [], status = StatusCodes.FORBIDDEN, isOperational = true) {
    super(message, status, errors, isOperational)
  }
}

export class API401Error extends BaseError {
  constructor(
    message = ReasonPhrases.UNAUTHORIZED,
    errors = [],
    status = StatusCodes.UNAUTHORIZED,
    isOperational = true
  ) {
    super(message, status, errors, isOperational)
  }
}

export class BusinessLogicError extends BaseError {
  constructor(
    message = ReasonPhrases.INTERNAL_SERVER_ERROR,
    errors = [],
    status = StatusCodes.INTERNAL_SERVER_ERROR,
    isOperational = true
  ) {
    super(message, status, errors, isOperational)
  }
}

export class API404Error extends BaseError {
  constructor(message = ReasonPhrases.NOT_FOUND, errors = [], status = StatusCodes.NOT_FOUND, isOperational = true) {
    console.log('API404Error::', status)
    super(message, status, errors, isOperational)
  }
}
