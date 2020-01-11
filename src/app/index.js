import { GraphQLModule } from '@graphql-modules/core'
import { resolversComposition } from './resolversComposition'
import {
  AuthModule,
  BookingModule,
  MenuModule,
  RestaurantModule,
  UserModule,
  S3Module,
} from '@modules'

const AppModule = new GraphQLModule({
  imports: [
    AuthModule,
    BookingModule,
    MenuModule,
    RestaurantModule,
    UserModule,
    S3Module,
  ],
  resolversComposition,
})

export default AppModule
