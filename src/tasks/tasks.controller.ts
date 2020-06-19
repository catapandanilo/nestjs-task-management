import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAll(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getWithFilters(filterDto);
    } else {
      return this.tasksService.getAll();
    }
  }

  @Get('/:id')
  getById(@Param('id') id: string): Task {
    return this.tasksService.getById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto)
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string, 
    @Body('status', TaskStatusValidationPipe) status: TaskStatus
  ): Task {
    return this.tasksService.updateStatus(id, status);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): void {
    this.tasksService.delete(id)
  }
}
 