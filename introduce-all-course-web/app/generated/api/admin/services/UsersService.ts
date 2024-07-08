/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedUserListDto } from "../models/PaginatedUserListDto";
import type { UserDto } from "../models/UserDto";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class UsersService {
  /**
   * 페이지네이션 목록 조회
   * /items
   * /items?page=1&limit=25
   * /items?filter={"$or": [{"name": "john"}, {"name": "joe"}]}
   * /items?filter={"name": "john"}
   * /items?filter={"email": {"ilike": "gmail"}}
   * /items?filter={"date": {"between": ["2022-05-01T15:00:00.000Z", "2022-05-02T15:00:00.000Z"]}}
   * /items?filter={"date": {"gt": "2022-05-02T15:00:00.000Z"}}
   * /items?filter={"date": {"gte": "2022-05-02T15:00:00.000Z"}}
   * /items?filter={"date": {"lt": "2022-05-02T15:00:00.000Z"}}
   * /items?filter={"date": {"lte": "2022-05-02T15:00:00.000Z"}}
   * /items?filter={"id": {"in": [1,2,3]}}
   * /items?filter={"relationItem.id": 1}
   * /items?filter={"relationItem.name": {"ilike": "john"}}
   * /items?sort={"id": "DESC"}
   * @param sort
   * @param filter
   * @param page
   * @param itemsPerPage
   * @returns PaginatedUserListDto
   * @throws ApiError
   */
  public static findAllUserWithPagination(
    sort?: string,
    filter?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedUserListDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/users",
      query: {
        sort: sort,
        filter: filter,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }

  /**
   * ID로 단일 조회
   * /items/1
   * /items/1?filter={"$or": [{"name": "john"}, {"name": "joe"}]}
   * /items/1?filter={"name": "john"}
   * /items/1?filter={"email": {"ilike": "gmail"}}
   * /items/1?filter={"date": {"between": ["2022-05-01T15:00:00.000Z", "2022-05-02T15:00:00.000Z"]}}
   * /items/1?filter={"date": {"gt": "2022-05-02T15:00:00.000Z"}}
   * /items/1?filter={"date": {"gte": "2022-05-02T15:00:00.000Z"}}
   * /items/1?filter={"date": {"lt": "2022-05-02T15:00:00.000Z"}}
   * /items/1?filter={"date": {"lte": "2022-05-02T15:00:00.000Z"}}
   * /items/1?filter={"id": {"in": [1,2,3]}}
   * /items/1?filter={"relationItem.id": 1}
   * /items/1?filter={"relationItem.name": {"ilike": "john"}}
   * @param id
   * @param filter
   * @returns UserDto
   * @throws ApiError
   */
  public static findOneUserById(
    id: number,
    filter?: string
  ): CancelablePromise<UserDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/users/{id}",
      path: {
        id: id,
      },
      query: {
        filter: filter,
      },
    });
  }
}
