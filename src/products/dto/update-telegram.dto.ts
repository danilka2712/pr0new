import { PartialType } from '@nestjs/mapped-types';
import { CreateProductsDto } from './create-telegram.dto';

export class UpdateProductsDto extends PartialType(CreateProductsDto) { }
