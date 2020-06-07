import gql from 'graphql-tag';

export default gql`  
  # type GoalSet { phone text beer: }
  type Goals {
    currentText: Int
    currentPhone: Int
    currentBeer: Int
    targetText: Int
    targetPhone: Int
    targetBeer: Int
    cadence: String
  }

  # input GoalSetInput { phone text beer }
  input GoalsInput {
    currentText: Int
    currentPhone: Int
    currentBeer: Int
    targetText: Int
    targetPhone: Int
    targetBeer: Int
    cadence: String
  }

  # type GoalSetResponse { phone text beer cadence }
  # type GoalSetCollection { currentGoals:GoalSet targetGoals:GoalSet cadence }
  # input GoalSetCollectionInput { targetGoals:GoalSetInput currentGoals:GoalSetInput cadence }
  # input FriendInput { username name icon description goals:GoalSetCollectionInput }

  input AddFriendInput {
    username: String!
    name: String!
    icon: String
    description: String
    goals: GoalsInput
  }

  # input FriendUpdateInput { username friendId name icon description goals:GoalSetCollectionInput }
  input UpdateFriendInput {
    username: String!
    friendId: String!
    name: String
    icon: String
    description: String
    goals: GoalsInput
  }

  # input UpdateFriendTargetGoalsInput { phone, text, beer, cadence, username, friendId }
  # type Friend { ...  goals: GoalSetCollection }
  type Friend {
    username: String
    friendId: String
    name: String
    icon: String
    description: String
    friendScore: Int
    goals: Goals
  }

  input LoginInput {
    username: String!
    password: String!
  }

  # input RegistrationInput { username password }
  input RegistrationInput {
    username: String!
    password: String!
    email: String
    name: String
  }

  input UpdateUserInput {
    username: String!
    password: String
    email: String
    name: String
  }

  # type User { username name friends:[Friend] }
  type User {
    username: String
    password: String
    email: String
    name: String
  }

  type AuthResponse {
    message: String
    username: String
    name: String
    token: String
  }

  type ConfirmationResponse {
    message: String
  }

  # input UpdateCurrentGoalInput { goalKey goalValue username friendId }
  input UpdateCurrentGoalInput {
    goalValue: Int!
    goalKey: String!
    username: String!
    friendId: String!
  }

  type Query {
    user(username: String!): User
    users: [User]

    friend(username: String!, friendId: String!): Friend
    friends(username: String!): [Friend]
  }

  type Mutation {
    loginUser(loginInput: LoginInput!): AuthResponse
    registerUser(registrationInput: RegistrationInput!): AuthResponse

    addFriendToUser(addFriendInput: AddFriendInput!): Friend
    
    updateUser(updateUserInput: UpdateUserInput!): User
    updateFriend(updateFriendInput: UpdateFriendInput!): Friend # is this what I want to return?
    updateCurrentGoal(updateCurrentGoalInput: UpdateCurrentGoalInput!): Goals

    removeUser(username: String): ConfirmationResponse
    removeUsers(ignoreString: String): ConfirmationResponse
    removeFriend(username: String, friendId: String!): ConfirmationResponse
    removeFriends(username: String!): ConfirmationResponse
  }
`;
