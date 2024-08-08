/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminDto } from "../models/AdminDto";
import type { PaginatedUserListDto } from "../models/PaginatedUserListDto";
import type { UpdateAdminDto } from "../models/UpdateAdminDto";
import type { UpdateUserDto } from "../models/UpdateUserDto";
import type { UserDto } from "../models/UserDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class AdminUsersService {
  /**
   * 유저 상세 조회
   * @param adminId
   * @returns AdminDto
   * @throws ApiError
   */
  public static getUserById(adminId: number): CancelablePromise<AdminDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/admins/{adminId}",
      path: {
        adminId: adminId,
      },
    });
  }
  /**
   * 유저 정보 수정
   * @param adminId
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static updateUser(
    adminId: number,
    requestBody: UpdateAdminDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/admin/admins/{adminId}",
      path: {
        adminId: adminId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 유저 목록 조회
   * @param role
   * @param queryText
   * @param page
   * @param itemsPerPage
   * @returns PaginatedUserListDto
   * @throws ApiError
   */
  public static getAllUsersWithPagination(
    role?: "SUPER" | "MANAGER" | "USER" | "EXPERT",
    queryText?: string,
    page: number = 1,
    itemsPerPage: number = 30
  ): CancelablePromise<PaginatedUserListDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/users",
      query: {
        role: role,
        queryText: queryText,
        page: page,
        itemsPerPage: itemsPerPage,
      },
    });
  }
  /**
   * 유저 상세 조회
   * @param userId
   * @returns UserDto
   * @throws ApiError
   */
  public static getUserById1(userId: number): CancelablePromise<UserDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/admin/users/{userId}",
      path: {
        userId: userId,
      },
    });
  }
  /**
   * 유저 정보 수정
   * @param userId
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static updateUser1(
    userId: number,
    requestBody: UpdateUserDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/admin/users/{userId}",
      path: {
        userId: userId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
