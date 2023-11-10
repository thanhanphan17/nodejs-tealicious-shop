import { Response } from 'express'

import StatusCodes from './statusCode'

class SuccessResponse {
    message: any
    status: number
    data: any
    options: any
    constructor({ message = '', status = StatusCodes.OK, data = {}, options = {} }) {
        this.message = message
        this.status = status
        this.data = data
        this.options = options
    }

    send(res: Response, headers = {}) {
        return res.status(this.status).json(this)
    }
}

class Ok extends SuccessResponse {
    constructor({ message = '', data = {}, options = {} }) {
        super({ message, data, options })
    }
}

class Create extends SuccessResponse {
    constructor({ message = '', data = {}, options = {} }) {
        super({ message, status: StatusCodes.CREATED, data, options })
    }
}

/**
 * Creates a new resource and sends a response.
 *
 * @param {any} res - The response object.
 * @param {string} message - The message to be sent.
 * @param {any} data - The data to be sent.
 * @param {object} options - Additional options for the creation process.
 * @return {void}
 */
export const CREATED = (res: any, message: string, data: any, options = {}) => {
    new Create({
        message,
        data,
        options
    }).send(res)
}

/**
 * A function that sends an OK response.
 *
 * @param {any} res - the response object
 * @param {string} message - the message to be sent
 * @param {any} data - the data to be sent
 * @param {object} options - additional options (optional)
 * @return {void}
 */
export const OK = (res: Response, message: string, data = {}, options = {}) => {
    new Ok({
        message,
        data,
        options
    }).send(res)
}
