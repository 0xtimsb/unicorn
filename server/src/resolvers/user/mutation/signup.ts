import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import argon2 from 'argon2';

import { User } from "../../../entities/user";
import { UserInput } from '../../../inputs/user-input';
import { UserResponse } from '../../../objects/user-response';

import { context } from "../../../types";
import { validateSignup } from '../../../utils/validate-signup';

@Resolver()
export class SignupResolver {
  @Mutation(() => UserResponse)
  async signup(
    @Arg('code') code: string,
    @Arg('data') { email, username, birthDate, password }: UserInput,
    @Ctx() { redis, req }: context
  ): Promise<UserResponse> {

    const errors = validateSignup({ email, username, password, birthDate });

    if (errors) {
      return { errors };
    }

    const savedCode = await redis.get(email);

    if (savedCode !== code) {
      return {
        errors: [
          {
            field: "code",
            message: "Invalid code.",
          },
        ],
      };
    }

    await redis.del(email);

    const hashedPassword = await argon2.hash(password);

    const user = User.create({
      email,
      username,
      birthDate: new Date(Date.parse(birthDate)),
      password: hashedPassword
    });

    try {
      await user.save();
    } catch (err) {
      return {
        errors: [
          {
            field: `Error code: ${err.code}`,
            message: err.message
          }
        ]
      };
    }

    // Login after signup.
    req.session.userId = user.id;

    return { user };
  }
}