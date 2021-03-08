import { Body, Controller, Post } from '@nestjs/common';
import { ValidationService } from './validation.service';

import { EmailDto } from './dto/email.dto';
import { ProductCodeDto } from './dto/product.code.dto';

@Controller('validation')
export class ValidationController {
  constructor(private validationService: ValidationService) {}
  @Post('email')
  existEmail(@Body() body: EmailDto) {
    return this.validationService.existsEmail(body.email);
  }

  @Post('product')
  existProductCode(@Body() body: ProductCodeDto) {
    return this.validationService.existsProductCode(body.code);
  }
}
