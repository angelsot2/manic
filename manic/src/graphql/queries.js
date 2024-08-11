/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
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
