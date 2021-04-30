import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RoleOptions, Roles } from '../auth/authorization/role.decorator';
import { RolesGuard } from '../auth/authorization/role.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotificationUserDto } from './dto/notification-user.dto';
import { OnesignalService } from './onesignal.service';

@Controller('onesignal')
@UseGuards(JwtAuthGuard)
export class OnesignalController {
  constructor(private onesignalService: OnesignalService) {}

  @Post('user')
  @Roles(RoleOptions.Admin)
  @UseGuards(RolesGuard)
  sendNotificationToUser(@Body() notificationUser: NotificationUserDto) {
    return this.onesignalService.notificationUser(notificationUser);
  }
}
