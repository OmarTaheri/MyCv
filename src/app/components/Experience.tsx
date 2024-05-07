import React from "react";
import styles from "./experience.module.css";

interface ExperienceProps {
  title: string;
  date: string;
  description: string;
}

const Experience: React.FC<ExperienceProps> = ({
  title,
  date,
  description,
}) => {
  return (
    <div className={styles.experience}>
      <div>
        <div className={styles.title}>
          <h3>{title}</h3>
          <span>{date}</span>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Experience;
