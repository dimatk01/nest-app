import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

interface BaseResponse<T> {
  data: T
  statusCode: number
  success: boolean
}

@Injectable()
export class ResponseInterseptor<T>
  implements NestInterceptor<T, BaseResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<BaseResponse<T>> {
    return next
      .handle()
      .pipe(map((data) => ({ data, statusCode: 1, success: true })))
  }
}
