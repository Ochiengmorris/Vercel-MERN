import React, { useContext, useMemo } from 'react';
// import { UserContext } from './UserContext.jsx';

// Randomly pick a color from the colors array
const getRandomColor = () => {
  const colors = [
    'bg-red-100',
    'bg-yellow-100',
    'bg-green-100',
    'bg-blue-100',
    'bg-indigo-100',
    'bg-purple-100',
    'bg-pink-100',
    'bg-teal-100',
    'bg-violet-100'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const MasonryGrid = ({ item, name }) => {
  // const { user } = useContext(UserContext);
  const colorClass = useMemo(getRandomColor, []);

  return (
    <div className={`${colorClass} relative p-4 border border-gray-200 rounded-lg shadow-md`}>
      {item}
      <div className='absolute text-xs right-2'>{name}</div>
    </div>
  );
}

export default MasonryGrid;
