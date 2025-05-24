import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer'
import { extname, join } from 'path';

const isProd = process.env.NODE_ENV === 'production';


@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image',{
    storage:diskStorage({
  destination: join(__dirname, '..', '..', 'uploads'),
      filename:(req,file,cb) => {
      const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `activity-${unique}${ext}`);
      },
    }),
  }))

    async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createActivityDto: CreateActivityDto,
  ) {
     let imagePath: string;

    if (isProd && file) {
      // En prod, on utilise l'image uploadée
      imagePath = `/uploads/${file.filename}`;
    } else {
      // En dev, on prend l’URL envoyée par le client (ou image par défaut)
      imagePath = createActivityDto.image || 'https://via.placeholder.com/300';
    }

    return this.activitiesService.create({
      ...createActivityDto,
      image: imagePath,
    });
  }
  

  @Get()
  findAll() {
    return this.activitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitiesService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
    return this.activitiesService.update(id, updateActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitiesService.remove(id);
  }
}
