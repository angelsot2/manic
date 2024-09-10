/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCalendar = /* GraphQL */ `
  subscription OnCreateCalendar($filter: ModelSubscriptionCalendarFilterInput) {
    onCreateCalendar(filter: $filter) {
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
export const onUpdateCalendar = /* GraphQL */ `
  subscription OnUpdateCalendar($filter: ModelSubscriptionCalendarFilterInput) {
    onUpdateCalendar(filter: $filter) {
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
export const onDeleteCalendar = /* GraphQL */ `
  subscription OnDeleteCalendar($filter: ModelSubscriptionCalendarFilterInput) {
    onDeleteCalendar(filter: $filter) {
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
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent($filter: ModelSubscriptionEventFilterInput) {
    onCreateEvent(filter: $filter) {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent($filter: ModelSubscriptionEventFilterInput) {
    onUpdateEvent(filter: $filter) {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent($filter: ModelSubscriptionEventFilterInput) {
    onDeleteEvent(filter: $filter) {
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
export const onCreateFriendship = /* GraphQL */ `
  subscription OnCreateFriendship(
    $filter: ModelSubscriptionFriendshipFilterInput
  ) {
    onCreateFriendship(filter: $filter) {
      id
      requesterId
      requesteeId
      status
      createdAt
      updatedAt
      requester {
        id
        name
        phoneNumber
        email
        createdAt
        updatedAt
        __typename
      }
      requestee {
        id
        name
        phoneNumber
        email
        createdAt
        updatedAt
        __typename
      }
      __typename
    }
  }
`;
export const onUpdateFriendship = /* GraphQL */ `
  subscription OnUpdateFriendship(
    $filter: ModelSubscriptionFriendshipFilterInput
  ) {
    onUpdateFriendship(filter: $filter) {
      id
      requesterId
      requesteeId
      status
      createdAt
      updatedAt
      requester {
        id
        name
        phoneNumber
        email
        createdAt
        updatedAt
        __typename
      }
      requestee {
        id
        name
        phoneNumber
        email
        createdAt
        updatedAt
        __typename
      }
      __typename
    }
  }
`;
export const onDeleteFriendship = /* GraphQL */ `
  subscription OnDeleteFriendship(
    $filter: ModelSubscriptionFriendshipFilterInput
  ) {
    onDeleteFriendship(filter: $filter) {
      id
      requesterId
      requesteeId
      status
      createdAt
      updatedAt
      requester {
        id
        name
        phoneNumber
        email
        createdAt
        updatedAt
        __typename
      }
      requestee {
        id
        name
        phoneNumber
        email
        createdAt
        updatedAt
        __typename
      }
      __typename
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
      conversations {
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
      conversations {
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
      conversations {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateConversation = /* GraphQL */ `
  subscription OnCreateConversation(
    $filter: ModelSubscriptionConversationFilterInput
  ) {
    onCreateConversation(filter: $filter) {
      id
      participants {
        nextToken
        __typename
      }
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
export const onUpdateConversation = /* GraphQL */ `
  subscription OnUpdateConversation(
    $filter: ModelSubscriptionConversationFilterInput
  ) {
    onUpdateConversation(filter: $filter) {
      id
      participants {
        nextToken
        __typename
      }
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
export const onDeleteConversation = /* GraphQL */ `
  subscription OnDeleteConversation(
    $filter: ModelSubscriptionConversationFilterInput
  ) {
    onDeleteConversation(filter: $filter) {
      id
      participants {
        nextToken
        __typename
      }
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onCreateMessage(filter: $filter) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onUpdateMessage(filter: $filter) {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
    onDeleteMessage(filter: $filter) {
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
export const onCreateUserConversations = /* GraphQL */ `
  subscription OnCreateUserConversations(
    $filter: ModelSubscriptionUserConversationsFilterInput
  ) {
    onCreateUserConversations(filter: $filter) {
      id
      userId
      conversationId
      user {
        id
        name
        phoneNumber
        email
        createdAt
        updatedAt
        __typename
      }
      conversation {
        id
        lastMessageAt
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUserConversations = /* GraphQL */ `
  subscription OnUpdateUserConversations(
    $filter: ModelSubscriptionUserConversationsFilterInput
  ) {
    onUpdateUserConversations(filter: $filter) {
      id
      userId
      conversationId
      user {
        id
        name
        phoneNumber
        email
        createdAt
        updatedAt
        __typename
      }
      conversation {
        id
        lastMessageAt
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUserConversations = /* GraphQL */ `
  subscription OnDeleteUserConversations(
    $filter: ModelSubscriptionUserConversationsFilterInput
  ) {
    onDeleteUserConversations(filter: $filter) {
      id
      userId
      conversationId
      user {
        id
        name
        phoneNumber
        email
        createdAt
        updatedAt
        __typename
      }
      conversation {
        id
        lastMessageAt
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
