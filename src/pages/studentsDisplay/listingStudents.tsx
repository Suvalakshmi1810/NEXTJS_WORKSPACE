import { gql, useQuery } from '@apollo/client';
import ListingStudentsComponent from './listingStudentsComponent';
import NavBar from '../../components/NavBar';

export const LISTING_STUDENTS_QUERY = gql`
  query ListingStudentsQuery {
    ListingAllStudents {
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
      img_url
      timestamp
    }
  }
`;

const ListingStudentsPage = () => {
  const { data, loading, error } = useQuery(LISTING_STUDENTS_QUERY);

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

  const studentsDataPassingProps = data?.ListingAllStudents;

  return (
    <div className="mx-auto flex flex-col min-h-screen bg-violet-100">
      <NavBar />
      <ListingStudentsComponent
        studentsDetailsData={studentsDataPassingProps}
      />
    </div>
  );
};

export default ListingStudentsPage;
