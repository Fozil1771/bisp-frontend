import React from 'react';
import { Link } from 'react-router-dom';
import { truncateText } from '../utils';
import { Card } from 'primereact/card';

interface CourseCardProps {
  courseId: string;
  title: string;
  description: string;
  banner: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ courseId, title, description, banner }) => {
  return (
    <>
      <Card>
        <Link to={`/course/${courseId}`}>
          <img
            className="w-full h-40 object-cover mb-4 rounded-md"
            src={`http://localhost:3003/public/course/${banner}`}
            alt={`Image for ${title}`}
          />
          <h4 className="text-xl font-semibold mb-2">{title}</h4>
        </Link>
        <p className="text-gray-500 mb-4">{truncateText(description, 100)}</p>
        <Link to={`/course/${courseId}`} className="text-blue-500 hover:underline">
          Learn more
        </Link>
      </Card>

    </>

  );
};

export default CourseCard;
