import React from 'react';
import { Link } from 'react-router-dom';
import placeholderImg from '../assets/english.jpg'
import { truncateText } from '../utils';

interface CourseCardProps {
  courseId: string;
  title: string;
  description: string;
  imageUrl: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ courseId, title, description, imageUrl }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Link to={`/course/${courseId}`}>
        <img
          className="w-full h-40 object-cover mb-4 rounded-md"
          src={placeholderImg}
          alt={`Image for ${title}`}
        />
        <h4 className="text-2xl font-semibold mb-2">{title}</h4>
      </Link>
      <p className="text-gray-500 mb-4">{truncateText(description, 100)}</p>
      <Link to={`/course/${courseId}`} className="text-blue-500 hover:underline">
        Learn more
      </Link>
    </div>
  );
};

export default CourseCard;
