/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCalendar = /* GraphQL */ `
  query GetCalendar($id: ID!) {
    getCalendar(id: $id) {
      id
      name
      events {
        nextToken
        __typename
      }
      owner {
        id
        name
        phoneNumber
        email
        createdAt
        updatedAt
        __typename
      }
      ownerId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCalendars = /* GraphQL */ `
  query ListCalendars(
    $filter: ModelCalendarFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCalendars(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        ownerId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      title
      startDate
      type
      duration
      notes
      calendar {
        id
        name
        ownerId
        createdAt
        updatedAt
        __typename
      }
      calendarId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        startDate
        type
        duration
        notes
        calendarId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      phoneNumber
      email
      friends {
        id
        name
        phoneNumber
        email
        createdAt
        updatedAt
        __typename
      }
      posts {
        nextToken
        __typename
      }
      calendars {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        phoneNumber
        email
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      name
      location
      duration
      sourceUserId
      sourceUser {
        id
        name
        phoneNumber
        email
        createdAt
        updatedAt
        __typename
      }
      viewLevel
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        location
        duration
        sourceUserId
        viewLevel
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const calendarsByOwnerIdAndId = /* GraphQL */ `
  query CalendarsByOwnerIdAndId(
    $ownerId: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCalendarFilterInput
    $limit: Int
    $nextToken: String
  ) {
    calendarsByOwnerIdAndId(
      ownerId: $ownerId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        ownerId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const eventsByCalendarIdAndId = /* GraphQL */ `
  query EventsByCalendarIdAndId(
    $calendarId: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eventsByCalendarIdAndId(
      calendarId: $calendarId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        startDate
        type
        duration
        notes
        calendarId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const postsBySourceUserIdAndId = /* GraphQL */ `
  query PostsBySourceUserIdAndId(
    $sourceUserId: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsBySourceUserIdAndId(
      sourceUserId: $sourceUserId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        location
        duration
        sourceUserId
        viewLevel
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
