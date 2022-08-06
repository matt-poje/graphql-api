import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Lesson } from './lesson.entity';
import { AssignStudentsInput, CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';
import { StudentService } from '../student/student.service';
import { Student } from 'src/student/student.entity';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query(() => [LessonType])
  lessons() {
    return this.lessonService.getLessons();
  }

  @Query(() => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Mutation(() => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(() => LessonType)
  assignStudents(
    @Args('assignStudentsInput')
    assignStudentsInput: AssignStudentsInput,
  ) {
    const { lessonId, studentIds } = assignStudentsInput;
    return this.lessonService.assignStudents(lessonId, studentIds);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson): Promise<Student[]> {
    return this.studentService.getManyStudents(lesson.students);
  }
}
