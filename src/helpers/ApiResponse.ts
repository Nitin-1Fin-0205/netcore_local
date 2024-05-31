export class ResponceOC {
  constructor(
    public status: number = 200,
    public message: string = 'SUCCESS',
    public data: object = {},
  ) {}
}

export class ApiResponse {
  status = 200;
  message = 'Success';
  error = '';
  stackTrace = '';
  data: any = {};

  constructor(
    status = 200,
    message = 'Success',
    error = '',
    stackTrace = '',
    data = {},
  ) {
    this.status = status;
    this.message = message;
    this.error = error;
    this.stackTrace = stackTrace;
    this.data = data;
  }
}
