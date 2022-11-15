export class CreateUserDto {
  readonly name: string;
  readonly user: string;
  readonly email: string;
  readonly position: string;
}

export class UpdateUserDto {
  readonly name?: string;
  readonly user?: string;
  readonly email?: string;
  readonly position?: string;
}
