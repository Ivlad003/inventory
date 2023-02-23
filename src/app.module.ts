import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import {
  GoogleRecaptchaModule,
  GoogleRecaptchaNetwork,
} from '@nestlab/google-recaptcha';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    GoogleRecaptchaModule.forRoot({
      secretKey: 'your_secret_key',
      response: (req) => req.headers.recaptcha,
      skipIf: false,
      network: GoogleRecaptchaNetwork.Recaptcha,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    InventoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
