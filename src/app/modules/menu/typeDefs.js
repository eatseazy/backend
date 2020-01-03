import gql from 'graphql-tag'

export default gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    myMenu: [Menu]!
  }

  type Mutation {
    createMenu(input: MenuInput): Menu! @auth @protect(role: "RESTAURANT")
  }

  type Menu {
    id: ID!
    name: String!
    description: String
  }

  type MenuCategorie {
    id: ID!
    Menu: Menu!
    categorie: MenuCategories!
    foods: [Food]!
    tva: Float!
  }

  type Food {
    id: ID!
    MenuCategorie: MenuCategorie!
    name: String!
    priceHT: Float!
    priceTTC: Float!
  }

  input MenuInput {
    RestaurantId: ID!
    name: String!
    description: String
  }

  input FoodInput {
    MenuCategorieId: ID!
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


