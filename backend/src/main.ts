import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Home Route
  //app.use("/api/home", require("./home/home.controller")); //PLM 20211122

  app.use(cors());
  await app.listen(3000);
}
bootstrap();
