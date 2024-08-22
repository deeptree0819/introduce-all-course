export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}

export enum AdminRole {
  SUPER = "SUPER",
  MANAGER = "MANAGER",
}

export enum Role {
  SUPER = "SUPER",
  MANAGER = "MANAGER",
  USER = "USER",
  EXPERT = "EXPERT",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum BannerStatus {
  BEFORE = "BEFORE",
  PROGRESS = "PROGRESS",
  AFTER = "AFTER",
}

export enum EventsOrderBy {
  CREATED_AT = "created_at",
  EVENT_END_AT = "event_end_at",
  EVENT_VIEW_COUNT = "event_view_count",
}

export enum FreeLecturesOrderBy {
  CREATED_AT = "created_at",
  EVENT_VIEW_COUNT = "free_lecture_view_count",
}
