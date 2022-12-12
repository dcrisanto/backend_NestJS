import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCreateEmbeddedDocumentRelationOneNDto {
  @IsString()
  @IsNotEmpty()
  readonly name: String;

  @IsString()
  @IsNotEmpty()
  color: String;
}

export class UpdateCreateEmbeddedDocumentRelationOneNDto extends PartialType(
  CreateCreateEmbeddedDocumentRelationOneNDto,
) {}
