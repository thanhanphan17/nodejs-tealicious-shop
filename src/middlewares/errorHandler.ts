import { API404Error, BaseError, BusinessLogicError, API401Error, API403Error } from '../core/error.response'
import { Request, Response, NextFunction } from 'express'

interface CustomError {
  status?: number
  name?: string
  statusCode?: any
  isOperational?: boolean
  message?: string
  errors?: any
}

export const handleReturnError = (err: CustomError, req: Request, res: Response, next: NextFunction): Response => {
  let error: CustomError = {}

  if (err instanceof BaseError) {
    error = {
      name: err.name,
      statusCode: err.statusCode,
      isOperational: err.isOperational,
      message: err.message,
      errors: err.errors
    }
  }

  return res.status(error.statusCode || 500).json({
    status: error.statusCode || 500,
    message: error.message || 'Internal server error',
    errors: error.errors
  })
}

export const handle404Error = (req: Request, res: Response, next: NextFunction) => {
  const error = new API404Error('Resource not found')
  next(error)
}
