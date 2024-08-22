import { ApiOperation, ApiOperationOptions } from "@nestjs/swagger";

/*
 *  현재 api 엔드포인트 함수명을 operationId로 정의할 때 사용
 *
 *  operationId를 generate 할 때 함수명을 이름으로 갖게하는 용도입니다.
 *
 *  ex)
 *
 *  @CustomApiOperation({
 *    summary: '유저 상세 조회',
 *    tags: ['users'],
 *  })
 *  @Get('/:id)
 *  async findOneUser(@Param('id', ParseIntPipe) id: number){}
 *
 */

export const CustomApiOperation = (options: ApiOperationOptions) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const operationId = options?.operationId || propertyKey;
    ApiOperation({ ...options, operationId })(target, propertyKey, descriptor);
  };
};
