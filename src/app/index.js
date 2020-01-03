import { GraphQLModule } from '@graphql-modules/core'
import { resolversComposition } from './resolversComposition'
import {
  AuthModule,
  BookingModule,
  MenuModule,
  RestaurantModule,
  UserModule,
} from '@modules'

const AppModule = new GraphQLModule({
  imports: [
    AuthModule,
    BookingModule,
    MenuModule,
    RestaurantModule,
    UserModule
  ],
  resolversComposition,
})

export default AppModule
