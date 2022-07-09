import { Controller, Get, Request, InternalServerErrorException, UseGuards, HttpCode, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { ArticlesEntity } from './articles.entity';
import { ArticlesService } from './articles.service';

@Controller('/apiv1/articles')
@ApiTags('Articles')
export class ArticlesController {

    constructor(
        private articlesService: ArticlesService
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Get('all')
    @HttpCode(200)
    @ApiOperation({ summary: 'Get List of All Articles' })
    @ApiResponse({ status: 200, description: 'Articles Found.', type: ArticlesEntity, isArray: true })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number
    })
    @ApiQuery({
        name: 'offset',
        required: false,
        type: Number
    })

    public async getAll(
        @Request() req,
        @Query('limit') limit?: number,
        @Query('offset') offset?: number
    ): Promise<ArticlesEntity[]> {
        try{
            return await this.articlesService.getAll(limit, offset);
        }catch(exception){
            throw new InternalServerErrorException(exception);
        }
    }

}