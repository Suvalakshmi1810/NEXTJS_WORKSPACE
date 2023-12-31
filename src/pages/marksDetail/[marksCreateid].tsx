import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { SubmitHandler, useForm } from 'react-hook-form';

import { INDIVIDUAL_INFO_STUDENT_QUERY } from '../studentsDisplay/[studentid]';
import NavBar from '../../components/NavBar';

interface StudentMarksdetailsType {
  reg_no: string;
  Maths: number;
  Science: number;
  Social: number;
}

const STUDENT_MARKS_ADD_MUTATION = gql`
  mutation CreateStudentMarks($marksData: CreateStudentMarksInput!) {
    createStudentMarks(marksData: $marksData)
  }
`;

const StudentMarksAddForm = () => {
  const router = useRouter();
  const { marksCreateid } = router.query;
  const regnoFromRouteQuery = marksCreateid as string;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<StudentMarksdetailsType>({ mode: 'onChange' });

  const [studentAddMarks] = useMutation(STUDENT_MARKS_ADD_MUTATION, {
    refetchQueries: [
      {
        query: INDIVIDUAL_INFO_STUDENT_QUERY,
        variables: { reg_no: regnoFromRouteQuery },
      },
    ],
  });

  const onSubmitData: SubmitHandler<StudentMarksdetailsType> = async (
    studentMarks
  ) => {
    const { reg_no, Maths, Science, Social } = {
      ...studentMarks,
      Maths: Number(studentMarks.Maths),
      Science: Number(studentMarks.Science),
      Social: Number(studentMarks.Social),
    };

    const MarksInfo = {
      marksData: {
        reg_no,
        Maths,
        Science,
        Social,
      },
    };

    const { data } = await studentAddMarks({ variables: MarksInfo });

    if (data) {
      router.push(`/studentsDisplay/${reg_no}`);
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center min-h-screen bg-violet-100 ">
      <NavBar />

      <form
        onSubmit={handleSubmit(onSubmitData)}
        className="w-full max-w-lg py-10 mt-20 px-10 h-full rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-400 "
      >
        <h1 className="text-center sm:text-4xl md:text-2xl lg:text-6xl xl:text-3xl">
          Student Marks Details
        </h1>

        <div className="m-4">
          <label className="text-gray-600 font-medium mt-4">
            Students Reg No <span className="text-red-600">*</span>
          </label>

          <input
            className="border-solid border-gray-300 border py-2 px-4 w-full
            rounded text-gray-700"
            value={regnoFromRouteQuery}
            {...register('reg_no')}
          />
        </div>
        <div className="m-4">
          <label className="text-gray-600 font-medium mt-4">
            Maths Mark <span className="text-red-600">*</span>
          </label>
          <span>{errors.Maths?.message}</span>
          <input
            className="border-solid border-gray-300 border py-2 px-4 w-full
            rounded text-gray-700"
            {...register('Maths', { required: 'This is a mandatory field' })}
          />
        </div>

        <div className="m-4">
          <label className="text-gray-600 font-medium mt-4">
            Science <span className="text-red-600">*</span>
          </label>
          <span>{errors.Science?.message}</span>
          <input
            className="border-solid border-gray-300 border py-2 px-4 w-full
            rounded text-gray-700"
            {...register('Science', { required: 'This is a mandatory field' })}
          />
        </div>

        <div className="m-4">
          <label className="text-gray-600 font-medium mt-4">
            Social <span className="text-red-600">*</span>
          </label>
          <span>{errors.Social?.message}</span>
          <input
            className="border-solid border-gray-300 border py-2 px-4 w-full
            rounded text-gray-700"
            {...register('Social', { required: 'This is a mandatory field' })}
          />
        </div>

        <div className=" flex flex-col items-center">
          <button
            type="submit"
            className="text-white  bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};
export default StudentMarksAddForm;
