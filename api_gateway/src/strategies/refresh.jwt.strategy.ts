// /* eslint-disable prettier/prettier */
// import { Injectable, UnauthorizedException, Request } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { ExtractJwt, Strategy } from "passport-jwt";
// import { AppService } from "src/app.service";

// @Injectable()
// export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
//   constructor(private authService: AppService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromBodyField("refresh"),
//       ignoreExpiration: false,
//       secretOrKey: "abc123",
//     });
//   }

//   // async validate(req: Request, payload:any){
//   //   const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
//   //   return { ...payload, refreshToken }
//   // }

// }