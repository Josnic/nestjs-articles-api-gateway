import { Controller, Post, Request, InternalServerErrorException, UseGuards, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from '../../auth';
import { AuthToken, AuthLogin  } from '../../auth/models';
import { AuthGuard } from '@nestjs/passport';

@Controller('/apiv1/user')
@ApiTags('User')
export class UserController {

    constructor(
        private authService: AuthService
    ) { }

    @UseGuards(AuthGuard('local'))
    @HttpCode(201)
    @Post('login')
    @ApiOperation({ summary: 'Sign in' })
    @ApiBody({ description: 'User credentials', type: AuthLogin })
    @ApiResponse({ status: 201, description: 'User logged.', type: AuthToken })
    @ApiResponse({ status: 401, description: 'User Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal server error.'})
    public async login(@Request() req): Promise<AuthToken> {
        try{
            return this.authService.login(req.user);
        }catch(exception){
            throw new InternalServerErrorException(exception);
        }
    }

}