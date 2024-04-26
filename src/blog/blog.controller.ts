import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // 블로그 전체 데이터 가져오는 api
  @Get()
  async getBlogs() {
    return await this.blogService.getBlogDatas();
  }

  // 상세 블로그 데이터 가져오는 api
  @Get('/:id')
  async getBlogById(@Param('id') id: string) {
    return await this.blogService.getBlogById(id);
  }

  // 블로그 등록 api
  @Post('/create')
  async createBlog(@Body() createBlogDto: CreateBlogDto) {
    return await this.blogService.createBlog(createBlogDto);
  }

  // 블로그 수정 api
  @Put('/:id')
  async updateBlogById(
    @Param('id') id: string,
    @Body() updateBlogDto: CreateBlogDto,
  ) {
    return await this.blogService.updateBlogById(id, updateBlogDto);
  }

  // 블로그 삭제 api
  @Delete('/:id')
  async deleteBlogById(@Param('id') id: string) {
    return await this.blogService.deleteBlogById(id);
  }
}
