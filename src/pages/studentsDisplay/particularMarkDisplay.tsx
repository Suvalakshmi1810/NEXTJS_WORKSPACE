import React from 'react';

interface MarksData {
  Social: number;
  Maths: number;
  Science: number;
}

const IndividualStudentMarksDisplay: React.FC<{ marksData: MarksData }> = ({
  marksData,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-purple-500">
      <h2 className="text-2xl font-semibold mb-4">Marks Details</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Maths</h3>
          <p className="bg-gray-100 px-4 py-2 rounded-md">{marksData.Maths}</p>
        </div>

        <div className="border p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Science</h3>
          <p className="bg-gray-100 px-4 py-2 rounded-md">
            {marksData.Science}
          </p>
        </div>

        <div className="border p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Social</h3>
          <p className="bg-gray-100 px-4 py-2 rounded-md">{marksData.Social}</p>
        </div>
      </div>
    </div>
  );
};

export default IndividualStudentMarksDisplay;
