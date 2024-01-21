import { Body, Controller, HttpException, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { IResponse } from 'src/common/response.interface';
import { IPage } from 'src/common/pages.interface';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { };
        
    @Post('/login')
    async login(@Body() authBody:AuthDto):Promise<IResponse<IPage<string>>> {
        try {
            const data = await this.authService.login(authBody);
            console.log(data)
            if (!data) throw new UnauthorizedException();
            
            return {
                data,
                statusCode: HttpStatus.OK
            }
        } catch (err) {
            throw new HttpException(
                err.message ?? "Internal Error",
                err.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}