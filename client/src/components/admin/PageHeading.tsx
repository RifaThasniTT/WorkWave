"use client"
import React from 'react';

interface PageHeadingProps {
  title: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({ title }) => {
  return (
    <h1 className="text-2xl font-semibold text-gray-800 ml-2">{title}</h1>
  );
};

export default PageHeading;
