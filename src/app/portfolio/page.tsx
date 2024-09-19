'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../page.module.css';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    title: "Project 1",
    description: "A brief description of project 1",
    imageUrl: "/images/project1.jpg",
    githubUrl: "https://github.com/yourusername/project1"
  },
  {
    title: "Project 2",
    description: "A brief description of project 2",
    imageUrl: "/images/project2.jpg",
    githubUrl: "https://github.com/yourusername/project2"
  },
  // Add more projects as needed
];

export default function Portfolio() {
  return (
    <div className={styles.container}>
      <h1>Portfolio</h1>
      <div className={styles.projectGrid}>
        {projects.map((project, index) => (
          <div key={index} className={styles.projectCard}>
            <Image src={project.imageUrl} alt={project.title} width={300} height={200} />
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}