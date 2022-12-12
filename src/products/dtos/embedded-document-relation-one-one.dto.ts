import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmbeddedDocumentRelationOneOneDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateEmbeddedDocumentRelationOneOneDto extends PartialType(
  CreateEmbeddedDocumentRelationOneOneDto,
) {}
