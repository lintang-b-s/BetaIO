import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api-error.js';

class Unauthorized extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
export default Unauthorized;
