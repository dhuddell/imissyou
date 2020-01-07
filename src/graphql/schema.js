import gql from 'graphql-tag';

export default gql`
  type GoalSet {
    phone: String
    text: String
    beer: String
  }

  input GoalSetInput {
    phone: String
    text: String
    beer: String
  }

  type GoalSetCollection {
    currentGoals: GoalSet
    targetGoals: GoalSet
    cadence: String
  }

  input GoalSetCollectionInput {
    currentGoals: GoalSetInput
    targetGoals: GoalSetInput
    cadence: String
  }

  input FriendInput {
    name: String!
    icon: String
    nickname: String
    friendScore: Float
    description: String
    goalSetCollection: GoalSetCollectionInput
    username: String!
  }

  type Friend {
    id: String
    name: String
    icon: String
    description: String
    friendScore: Float
    goalSetCollection: GoalSetCollection
  }



  input LoginInput {
    username: String!
    password: String!
  }

  input RegistrationInput {
    username: String!
    password: String!
  }

  type User {
    username: String!
    password: String!
    name: String
    friends: [Friend]
    setting: String
  }

  type AuthResponse {
    message: String!
    username: String!
    token: String
  }

  type Query {
    user(username: String!): User
    users: [User]
    friend(username: String!, id: String!): Friend
    friends: [Friend]
  }

  type Mutation {
    updateTargetFriendGoals(id: String!, goalSetCollection: GoalSetCollectionInput): Friend

    addFriendToUser(friendInput: FriendInput!): Friend
    removeFriend(friendId: String): String
    removeFriends(ignoreString: String): String

    removeUser(username: String): String
    registerUser(registrationInput: RegistrationInput!): AuthResponse
    removeUsers(ignoreString: String): String
    loginUser(loginInput: LoginInput!): AuthResponse
  }
`;
