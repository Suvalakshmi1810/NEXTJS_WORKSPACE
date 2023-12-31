interface studentDetailsType {
  reg_no: string;
  s_name: string;
  dob: string;
  age: number;
  gender: string;
  s_class: number;
  s_section: string;
  f_name: string;
  m_name: string;
  address: string;
  phno: number;
}

const IndividualStudentInfoDisplay: React.FC<{
  studentDetailsData: studentDetailsType;
}> = ({ studentDetailsData }) => {
  const {
    reg_no,
    s_name,
    dob,
    age,
    gender,
    s_class,
    s_section,
    f_name,
    m_name,
    address,
    phno,
  } = studentDetailsData;

  return (
    <div className="bg-white shadow-md rounded-lg  flex flex-col justify-center items-center border border-purple-500 w-1/3 p-2 m-4">
      <h2 className="text-2xl font-semibold mb-4">Student Details</h2>
      <div className="space-y-2">
        <p>
          <strong>Registration Number:</strong> {reg_no}
        </p>
        <p>
          <strong>Name:</strong> {s_name}
        </p>
        <p>
          <strong>Date of Birth:</strong> {dob}
        </p>
        {/* Add more details as needed */}
        <p>
          <strong>Age:</strong> {age}
        </p>
        <p>
          <strong>Gender:</strong> {gender}
        </p>
        <p>
          <strong>Class:</strong> {s_class}
        </p>
        <p>
          <strong>Section:</strong> {s_section}
        </p>
        <p>
          <strong>Fathers Name:</strong> {f_name}
        </p>
        <p>
          <strong>Mothers Name:</strong> {m_name}
        </p>
        <p>
          <strong>Address:</strong> {address}
        </p>
        <p>
          <strong>Phone Number:</strong> {phno}
        </p>
      </div>
    </div>
  );
};
export default IndividualStudentInfoDisplay;
