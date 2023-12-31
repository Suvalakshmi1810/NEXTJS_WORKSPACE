import Link from 'next/link';

interface StudentsDetailsType {
  s_name: string;
  reg_no: string;
  dob: string;
  age: number;
  gender: string;
  s_class: number;
  s_section: string;
  f_name: string;
  m_name: string;
  address: string;
  phno: number;
  img_url: string;
  timestamp: number;
}

const convertTimestampToDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const ListingStudentsComponent: React.FC<{
  studentsDetailsData: StudentsDetailsType[];
}> = ({ studentsDetailsData }) => {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20 border border-purple-500 m-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Timestamp
              </th>
              <th scope="col" className="px-6 py-3">
                View
              </th>
            </tr>
          </thead>

          {studentsDetailsData &&
            studentsDetailsData.map((student: StudentsDetailsType) => (
              <tbody key={student.reg_no}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={student.img_url}
                    />

                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        {student.s_name}
                      </div>

                      <div className="font-normal text-gray-500">
                        {student.reg_no}
                      </div>
                    </div>
                  </th>

                  <td className="px-6 py-4">
                    {convertTimestampToDate(student.timestamp)}
                  </td>

                  <td className="px-6 py-4">
                    <Link href={`/studentsDisplay/${student.reg_no}`}>
                      View Details
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
};
export default ListingStudentsComponent;
