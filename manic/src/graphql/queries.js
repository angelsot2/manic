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
      isPrivate
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
        isPrivate
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
      type
      startDate
      endDate
      duration
      notes
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
        type
        startDate
        endDate
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
export const getFriendship = /* GraphQL */ `
  query GetFriendship($id: ID!) {
    getFriendship(id: $id) {
      id
      requesterId
      requesteeId
      status
      createdAt
      updatedAt
      requester
      requestee
      __typename
    }
  }
`;
export const listFriendships = /* GraphQL */ `
  query ListFriendships(
    $filter: ModelFriendshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriendships(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        requesterId
        requesteeId
        status
        createdAt
        updatedAt
        requester
        requestee
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
      desiredPosition
      location
      date
      duration
      description
      ownerId
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
        desiredPosition
        location
        date
        duration
        description
        ownerId
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
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      phoneNumber
      email
      friends {
        nextToken
        __typename
      }
      friendRequests {
        nextToken
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
export const getConversation = /* GraphQL */ `
  query GetConversation($id: ID!) {
    getConversation(id: $id) {
      id
      participants
      messages {
        nextToken
        __typename
      }
      lastMessageAt
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listConversations = /* GraphQL */ `
  query ListConversations(
    $filter: ModelConversationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConversations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        participants
        lastMessageAt
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      content
      senderId
      conversationId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        senderId
        conversationId
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
        isPrivate
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
        type
        startDate
        endDate
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
export const friendshipsByRequesterId = /* GraphQL */ `
  query FriendshipsByRequesterId(
    $requesterId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFriendshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    friendshipsByRequesterId(
      requesterId: $requesterId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        requesterId
        requesteeId
        status
        createdAt
        updatedAt
        requester
        requestee
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const friendshipsByRequesteeId = /* GraphQL */ `
  query FriendshipsByRequesteeId(
    $requesteeId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFriendshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    friendshipsByRequesteeId(
      requesteeId: $requesteeId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        requesterId
        requesteeId
        status
        createdAt
        updatedAt
        requester
        requestee
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const postsByOwnerIdAndId = /* GraphQL */ `
  query PostsByOwnerIdAndId(
    $ownerId: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByOwnerIdAndId(
      ownerId: $ownerId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        desiredPosition
        location
        date
        duration
        description
        ownerId
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
export const messagesBySenderId = /* GraphQL */ `
  query MessagesBySenderId(
    $senderId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesBySenderId(
      senderId: $senderId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
        senderId
        conversationId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const messagesByConversationIdAndId = /* GraphQL */ `
  query MessagesByConversationIdAndId(
    $conversationId: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByConversationIdAndId(
      conversationId: $conversationId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
        senderId
        conversationId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const messagesByCreatedAtAndId = /* GraphQL */ `
  query MessagesByCreatedAtAndId(
    $createdAt: AWSDateTime!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByCreatedAtAndId(
      createdAt: $createdAt
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
        senderId
        conversationId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
