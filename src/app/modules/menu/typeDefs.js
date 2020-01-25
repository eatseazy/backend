import gql from 'graphql-tag'

export default gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    myMenus: [Menu]! @auth @protect(role: "RESTAURANT")
  }

  type Mutation {
    createMenu(input: MenuInput!): Menu! @auth @protect(role: "RESTAURANT")
    createFoodItem(input: FoodItemInput!): FoodItem! @auth @protect(role: "RESTAURANT")
    deleteFoodItem(id: ID!): Boolean! @auth @protect(role: "RESTAURANT")
  }

  type Menu {
    id: ID!
    name: String!
    foodItems: [FoodItem]
  }

  type FoodItem {
    id: ID!
    categorie: MenuCategories!
    name: String!
    priceHT: Float!
    priceTTC: Float!
  }

  input MenuInput {
    restaurantId: ID!
    name: String!
  }

  input FoodItemInput {
    categorie: MenuCategories!
    name: String!
    priceHT: Float!
    priceTTC: Float!
  }

  enum MenuCategories {
    STARTER
    DISHES
    DRINK
    ALCOHOLIC_DRINK
    CHEESE
    DESSERT
  }`


