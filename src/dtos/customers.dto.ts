export class CreateCustomerDto {
  readonly name: string;
  readonly email: string;
  readonly user: string;
}

export class UpdateCustomerDto {
  readonly name?: string;
  readonly email?: string;
  readonly user?: string;
}
