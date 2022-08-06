import { Mutation, Query, Args, Resolver } from '@nestjs/graphql';
import { Student } from './student.entity';
import { CreateStudentInput } from './student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query((returns) => [StudentType])
  async students() {
    return await this.studentService.getStudents();
  }

  @Query((returns) => StudentType)
  async student(@Args('id') id: string) {
    return await this.studentService.getStudent(id);
  }

  @Mutation((returns) => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return await this.studentService.createStudent(createStudentInput);
  }
}
