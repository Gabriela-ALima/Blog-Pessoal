import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { PostagemModule } from './postagem/postagem.module';
import { TemaModule } from './tema/tema.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    // NÃO usa .env, apenas libera process.env
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      useFactory: () => {
        // PRODUÇÃO (Render)
        if (process.env.NODE_ENV === 'production') {
          return {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
            synchronize: true,
            autoLoadEntities: true,
          };
        }

        // DESENVOLVIMENTO LOCAL
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3307, 
          username: 'blog',
          password: 'admin',
          database: 'db_blogpessoal',
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),

    PostagemModule,
    TemaModule,
    AuthModule,
    UsuarioModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
