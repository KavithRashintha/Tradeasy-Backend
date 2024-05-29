import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { AppService} from "./app.service";
import { join } from 'path';
import {AppController} from "./app.controller";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: process.env.MAIL_SERVICE,
        port: parseInt(process.env.MAIL_PORT, 10),
        host: process.env.MAIL_HOST,
        secure: false,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: `"Treadeasy" <${process.env.MAIL_FROM}>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers:[AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
