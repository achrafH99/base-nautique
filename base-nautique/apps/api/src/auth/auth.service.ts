import { Dependencies, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService : UserService){}

    async signIn(email:string,password:string){
        const user = await this.userService.findOneByEmail(email);
        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) {
            throw new UnauthorizedException();
        }

        const payload = { email: user.email };
        return {
        access_token: await this.jwtService.signAsync(payload),
        };
    }
}
