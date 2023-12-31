import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import NavBar from '@Components/NavBar';
import IndividualStudentMarksDisplay from './particularMarkDisplay';
import IndividualStudentInfoDisplay from './particularStudentDisplay';

export const INDIVIDUAL_INFO_STUDENT_QUERY = gql`
  query GetStudentDetail($reg_no: String!) {
    DisplayOneStudent(reg_no: $reg_no) {
      reg_no
      s_name
      dob
      age
      gender
      s_class
      s_section
      f_name
      m_name
      address
      phno

      DisplayOneStudentMarks {
        Social
        Maths
        Science
      }
    }
  }
`;

const IndividualStudentDetail = () => {
  const router = useRouter();
  const { studentid } = router.query;

  const { data, loading, error } = useQuery(INDIVIDUAL_INFO_STUDENT_QUERY, {
    variables: { reg_no: studentid },
  });

  if (loading) {
    return (
      <div className="mx-auto flex flex-col justify-center items-center min-h-screen bg-violet-100">
        LOADING...
      </div>
    );
  }

  if (error) {
    console.log(error);
  }

  const student = data?.DisplayOneStudent;
  const isMarksGiven = !data?.DisplayOneStudent?.DisplayOneStudentMarks;

  return (
    <div className="min-h-screen bg-no-repeat bg-cover ">
      <NavBar />
      {student && (
        <div>
          <div className="mt-40">
            <IndividualStudentInfoDisplay studentDetailsData={student} />
          </div>
          <div>
            {isMarksGiven ? (
              <form>
                <Link
                  className="text-blue-500 hover:text-blue-700 underline text-3xl m-7"
                  href={`/marksDetail/${student.reg_no}`}
                >
                  Give the marks Details
                </Link>
              </form>
            ) : (
              <div>
                <IndividualStudentMarksDisplay
                  marksData={student.DisplayOneStudentMarks}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualStudentDetail;
