import { InputType, Field } from 'type-graphql';

@InputType()
export class UserInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  birthDate: string;

  @Field()
  password: string;
}