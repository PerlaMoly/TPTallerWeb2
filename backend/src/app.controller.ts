import {Controller, Response, Get} from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('/ping')
  async ping(@Response() res) {
    return res.send({ message: "pong" });
  }
}
