import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import router from 'next/router';
import NavBar from '@Components/NavBar';
import { LISTING_STUDENTS_QUERY } from './studentsDisplay/listingStudents';

interface StudentDetailsType {
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

const convertImageToBase64 = async (
  file: File
): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Error reading the file'));
      }
    };
    reader.readAsDataURL(file);
  });
};

const STUDENT_DETAILS_ADD_MUTATION = gql`
  mutation studentAddMutation($user: CreateStudentAddInput!) {
    createStudent(user: $user)
  }
`;

const CreateStudentForm: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<StudentDetailsType>({ mode: 'onChange' });

  const [studentAddDetail] = useMutation(STUDENT_DETAILS_ADD_MUTATION, {
    refetchQueries: [LISTING_STUDENTS_QUERY],
  });

  const onSubmitData: SubmitHandler<StudentDetailsType> = async (
    studentDetailData
  ) => {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    if (fileInput && fileInput.files && fileInput.files[0]) {
      const imageFile = fileInput.files[0];
      const base64Image = await convertImageToBase64(imageFile);

      if (base64Image) {
        const updatedData = {
          ...studentDetailData,
          age: Number(studentDetailData.age),
          phno: Number(studentDetailData.phno),
          s_class: Number(studentDetailData.s_class),
          img_url: base64Image,
          timestamp: Date.now(),
        };
        console.log('update', updatedData);
        const {
          s_name,
          reg_no,
          dob,
          age,
          gender,
          s_class,
          s_section,
          f_name,
          m_name,
          address,
          phno,
          img_url,
          timestamp,
        } = updatedData;

        const studentInfo = {
          user: {
            s_name,
            reg_no,
            dob,
            age,
            gender,
            s_class,
            s_section,
            f_name,
            m_name,
            address,
            phno,
            img_url,
            timestamp,
          },
        };

        const { data } = await studentAddDetail({
          variables: studentInfo,
        });

        if (data) {
          console.log(data);
          router.push('/studentsDisplay/listingStudents');
        }
      }
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
          Student Details
        </h1>

        <div className="m-4">
          <label className="text-gray-600 font-medium mt-4">
            Students Image <span className="text-red-600">*</span>
          </label>
          <span>{errors.img_url?.message}</span>
          <input
            className=""
            type="file"
            accept="image/*"
            {...register('img_url', { required: 'Image must be uploaded' })}
          />
        </div>

        <div className="m-4">
          <label className="text-gray-600 font-medium mt-4">
            Students Name <span className="text-red-600">*</span>
          </label>
          <span>{errors.s_name?.message}</span>
          <input
            className="border-solid border-gray-300 border py-2 px-4 w-full
            rounded text-gray-700"
            {...register('s_name', {
              required: 'This is a mandatory field',
              minLength: {
                value: 2,
                message: 'Minimum 2 characters required',
              },
              maxLength: {
                value: 50,
                message: 'Maximum 50 characters allowed',
              },
            })}
          />
        </div>

        <div className="m-4">
          <label className="text-gray-600 font-medium mt-4">
            Register Number <span className="text-red-600">*</span>
          </label>
          <span>{errors.reg_no?.message}</span>
          <input
            className="border-solid border-gray-300 border py-2 px-4 w-full
            rounded text-gray-700"
            {...register('reg_no', { required: 'This is a mandatory field' })}
          />
        </div>

        <div className="m-4">
          <label className="text-gray-600 font-medium mt-4">
            DOB <span className="text-red-600">*</span>
          </label>
          <span>{errors.dob?.message}</span>
          <input
            placeholder="mm/dd/yyyy"
            className="border-solid border-gray-300 border py-2 px-4 w-full
            rounded text-gray-700"
            {...register('dob', { required: 'This is a mandatory field' })}
          />
        </div>

        <div className="m-4">
          <label className="text-gray-600 font-medium">
            Age <span className="text-red-600">*</span>
          </label>
          <span>{errors.age?.message}</span>
          <input
            className="border-solid border-gray-300 border py-2 px-4 w-full
            rounded text-gray-700"
            {...register('age', {
              required: 'This is a mandatory field',
              pattern: {
                value: /^[0-9]{1,3}$/,
                message: 'Please enter a valid age',
              },
            })}
          />
        </div>

        <div className="m-4">
          <label className="text-gray-600 font-medium">
            Gender <span className="text-red-600">*</span>
          </label>
          <span>{errors.gender?.message}</span>
          <input
            className="border-solid border-gray-300 border py-2 px-4 w-full
            rounded text-gray-700"
            {...register('gender', { required: 'This is a mandatory field' })}
          />
        </div>

        <div className="m-4">
          <label className="text-gray-600 font-medium">
            Class <span className="text-red-600">*</span>
          </label>
          <span>{errors.s_class?.message}</span>
          <input
            className="border-solid border-gray-300 border py-2 px-4 w-full
            rounded text-gray-700"
            {...register('s_class', { required: 'This is a mandatory field' })}
          />
        </div>

        <div className="m-4">
          <label className="text-gray-600 font-medium">
            Section <span className="text-red-600">*</span>
          </label>
          <span>{errors.s_section?.message}</span>
          <input
            className="border-solid border-gray-300 border py-2 px-4 w-full
            rounded text-gray-700"
            {...register('s_section', {
              required: 'This is a mandatory field',
            })}
          />
        </div>

        <div className="m-4">
          <label className="text-gray-600 font-medium">
            Fathers Name <span className="text-red-600">*</span>
          </label>
          <span>{errors.f_name?.message}</span>
          <input
            className="border-solid border-gray-300 border py-2 px-4 w-full
            rounded text-gray-700"
            {...register('f_name', { required: 'This is a mandatory field' })}
          />
        </div>

        <div className="m-4">
          <label className="text-gray-600 font-medium">
            Mothers Name <span className="text-red-600">*</span>
          </label>
          <span>{errors.m_name?.message}</span>
          <input
            className="border-solid border-gray-300 border py-2 px-4 w-full
            rounded text-gray-700"
            {...register('m_name', { required: 'This is a mandatory field' })}
          />
        </div>

        <div className="m-4">
          <label className="text-gray-600 font-medium">
            Address <span className="text-red-600">*</span>
          </label>
          <span>{errors.address?.message}</span>
          <input
            className="border-solid border-gray-300 border py-2 px-4 w-full
            rounded text-gray-700"
            {...register('address', { required: 'This is a mandatory field' })}
          />
        </div>

        <div className="m-4">
          <label className="text-gray-600 font-medium">
            Mobile No. <span className="text-red-600">*</span>
          </label>
          <span>{errors.phno?.message}</span>
          <input
            className="border-solid border-gray-300 border py-2 px-4 w-full
            rounded text-gray-700"
            {...register('phno', {
              required: 'This is a mandatory field',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Please enter a valid 10-digit mobile number',
              },
            })}
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

export default CreateStudentForm;
