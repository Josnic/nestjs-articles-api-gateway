import { Controller, Get, Request, InternalServerErrorException, UseGuards, HttpCode, Query, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import * as moment from 'moment';

import { ArticlesEntity } from './articles.entity';
import { ArticlesService } from './articles.service';
import { ArticlesResponseDto } from './articles.response.dto';
import { TrackUpdateService } from './../track-update/track-update.service';
import { TrackUpdateEntity } from './../track-update/track-update.entity';
import { TrackUpdateDto } from './../track-update/track-update.dto';
import { ARTICLES_URL_MINUTES_TO_CALL } from './../../constants';

@Controller('/apiv1/articles')
@ApiTags('Articles')
export class ArticlesController {

    constructor(
        private articlesService: ArticlesService,
        private trackUpdateService: TrackUpdateService
    ) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Get('all')
    @HttpCode(200)
    @ApiOperation({ summary: 'Get List of All Articles' })
    @ApiResponse({ status: 200, description: 'Articles Found.', type: ArticlesResponseDto })
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
    ): Promise<ArticlesResponseDto> {
        try{
            let remoteArticles: ArticlesEntity[] = [];
            const track: TrackUpdateEntity[]  = await this.trackUpdateService.get();
            if (track.length == 0){
                const remoteRequest: any = await this.articlesService.findAll();
                if (remoteRequest.status == 200){
                    remoteArticles = remoteRequest.data;
                    const trackUpdateDto = new TrackUpdateDto();
                    trackUpdateDto.apiCall = 1;
                    await this.trackUpdateService.save(trackUpdateDto);
                }
            }else{
                const lastUpdate = moment(track[0].updated);
                const currentdate = moment();
                //fechas

                const duration = moment.duration(currentdate.diff(lastUpdate));
                if (duration.asMinutes() > ARTICLES_URL_MINUTES_TO_CALL){
                    const remoteRequest: any = await this.articlesService.findAll();
                    if (remoteRequest.status == 200){
                        remoteArticles = remoteRequest.data;
                        if (remoteArticles.length > 0){
                            await this.articlesService.deleteAll();
                        }
                    }
                    
                }
            }
            if (remoteArticles.length > 0){
                await this.articlesService.saveAll(remoteArticles);
            }
            
            const articlesResponseDto = new ArticlesResponseDto();
            articlesResponseDto.articles = await this.articlesService.getAll(limit, offset);
            articlesResponseDto.total = await this.articlesService.getCount();
            return articlesResponseDto;
        }catch(exception){
            throw new InternalServerErrorException(exception);
        }
    }

}