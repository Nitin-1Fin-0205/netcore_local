import { Injectable, CanActivate, ForbiddenException, UnauthorizedException, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    debugger;
    // Your authorization logic goes here
    // You can access the request object using `context.switchToHttp().getRequest()`

    const request = context.switchToHttp().getRequest();
    // Example: Check if the user is authenticated
   // return !!request.user;

    if (!request.user) {
        throw new UnauthorizedException('Unauthorized access');
      }
  
      return true;

  }
}
