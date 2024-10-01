import configs from "../../../configs";
import { LoginDto } from "./dto/login.dto";
import * as jwt from "jsonwebtoken";

export class AuthService {
  static async login(loginDto: LoginDto) {
    if (
      loginDto.username != configs.AUTH_USERNAME ||
      loginDto.password != configs.AUTH_PASSWORD
    ) {
      return null;
    }

    const token = jwt.sign(loginDto, configs.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return token;
  }
}
