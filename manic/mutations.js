/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCalendar = /* GraphQL */ `
  mutation CreateCalendar(
    $input: CreateCalendarInput!
    $condition: ModelCalendarConditionInput
  ) {
    createCalendar(input: $input, condition: $condition) {
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
export const updateCalendar = /* GraphQL */ `
  mutation UpdateCalendar(
    $input: UpdateCalendarInput!
    $condition: ModelCalendarConditionInput
  ) {
    updateCalendar(input: $input, condition: $condition) {
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
export const deleteCalendar = /* GraphQL */ `
  mutation DeleteCalendar(
    $input: DeleteCalendarInput!
    $condition: ModelCalendarConditionInput
  ) {
    deleteCalendar(input: $input, condition: $condition) {
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
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
