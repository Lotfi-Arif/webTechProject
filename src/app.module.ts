import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BannersModule } from './banners/banners.module';
import { Banner } from './banners/entities/banner.entity';

@Module({
  imports: [
    BannersModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'Web.Tech123',
      database: 'dev_profile',
      autoLoadEntities: true,
      entities: [Banner],
      logger: 'advanced-console',
      // migrationsRun: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
