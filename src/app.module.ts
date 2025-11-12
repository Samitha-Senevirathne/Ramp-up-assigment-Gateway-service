import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [                             //subgraphs (services)
            { name: 'vehicles', url: 'http://localhost:3000/graphql' },  
            { name: 'records', url: 'http://localhost:3001/graphql' },
          ],
        }),
      },
    }),
  ],
})
export class AppModule {}