import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateCreateEmbeddedDocumentRelationOneNDto } from './embedded-document-relation-one-n.dto';

export class Skills {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly color: string;
}

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsNumber()
  @IsNotEmpty()
  readonly phone: number;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Skills)
  readonly skills: Skills[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCreateEmbeddedDocumentRelationOneNDto)
  readonly embeddedDocumentRelationOneN: CreateCreateEmbeddedDocumentRelationOneNDto[];
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
