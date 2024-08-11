/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent($filter: ModelSubscriptionEventFilterInput) {
    onCreateEvent(filter: $filter) {
      id
      title
      startDate
      type
      duration
      notes
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent($filter: ModelSubscriptionEventFilterInput) {
    onUpdateEvent(filter: $filter) {
      id
      title
      startDate
      type
      duration
      notes
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent($filter: ModelSubscriptionEventFilterInput) {
    onDeleteEvent(filter: $filter) {
      id
      title
      startDate
      type
      duration
      notes
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
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
