import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    console.log('Value before validation:', value); // Log the incoming value

    if (!value || metadata.type !== 'body') {
      return value; // Pass non-body types untouched
    }

    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Validation Errors:', error.errors);
        throw new BadRequestException(error.errors);
      }
      throw new BadRequestException('Validation failed');
    }
  }
}
