import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
interface BaseResponse<T> {
    data: T;
    statusCode: number;
    success: boolean;
}
export declare class ResponseInterseptor<T> implements NestInterceptor<T, BaseResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<BaseResponse<T>>;
}
export {};
