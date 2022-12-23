import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api-error.js';

class NotFound extends CustomAPIError {
  constructor(message) {
    super(message);
    // memberikan statusCode not found
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
export default NotFound;