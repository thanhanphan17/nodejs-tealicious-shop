import { Request, Response, NextFunction } from 'express'
import userService from '~/services/user.service'
import { CREATED, OK } from '~/core/success.response'

class UserController {
  async login(req: Request, res: Response, next: NextFunction) {}

  /**
   * Registers a user.
   *
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @param {NextFunction} next - the next function
   * @return {Promise<void>} - a promise that resolves to void
   */
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body)
      const user = await userService.register(req.body)
      console.log(user)
      CREATED(res, 'create user successfully', user)
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController()
