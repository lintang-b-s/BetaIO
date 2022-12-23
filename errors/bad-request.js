// import http-status-codes
import { StatusCodes } from 'http-status-codes';
// import custom-api
import CustomAPIError from './custom-api-error.js';

class BadRequest extends CustomAPIError {
  constructor(message) {
    super(message);
    // memberikan statusCode bad request
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
export default BadRequest;