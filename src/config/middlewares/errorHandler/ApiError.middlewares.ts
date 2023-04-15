import { IApiError } from './interface/ApiError.interface';

export class ApiError extends Error implements IApiError {
  readonly status: number;
  readonly message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static BadRequest(): ApiError {
    return new ApiError(400, 'Bad request');
  }

  static Unauthorized(): ApiError {
    return new ApiError(401, 'Authentication credential failed');
  }

  static Forbbiden(): ApiError {
    return new ApiError(403, 'Authorization denied');
  }

  static NotFound(): ApiError {
    return new ApiError(404, 'Not Found');
  }
  static Internal(message: string): ApiError {
    return new ApiError(500, message);
  }
}
