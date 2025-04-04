import React from "react";
import styles from "./EventCard.module.scss";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  location,
  description,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <div className={styles.details}>
        <p>
          <span>Date:</span>
          <span>{date}</span>
        </p>
        <p>
          <span>Location:</span>
          <span>{location}</span>
        </p>
        <p>
          <span>Description:</span>
          <span>{description}</span>
        </p>
      </div>
      <div className={styles.actions}>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default EventCard;
