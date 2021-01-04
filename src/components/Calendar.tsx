import React, { useState } from 'react';
import Select from './Select';
import Month from '../utilities/Month';
import styles from '../styles/Calendar.module.css';

interface WeekProps {
  weekdays: number[];
  index: number;
  month: Month;
}

const Week: React.FC<WeekProps> = ({ weekdays, index, month }) => {
  if (index === 0) {
    const firstDayIndex = weekdays.findIndex((day) => day < 7);
    return (
      <div className={styles.week}>
        {weekdays.map((day, index) =>
          index < firstDayIndex ? (
            <div key={day} className={`${styles.dayNumber} ${styles.muted}`}>
              {day}
            </div>
          ) : (
            <div key={day} className={styles.dayNumber}>
              {day}
            </div>
          ),
        )}
      </div>
    );
  }
  if (index === month.parseMonth().length - 1) {
    const lastDayIndex = weekdays.findIndex((day) => day === month.totalDays);
    return (
      <div className={styles.week}>
        {weekdays.map((day, index) =>
          index > lastDayIndex ? (
            <div key={day} className={`${styles.dayNumber} ${styles.muted}`}>
              {day}
            </div>
          ) : (
            <div key={day} className={styles.dayNumber}>
              {day}
            </div>
          ),
        )}
      </div>
    );
  }
  return (
    <div className={styles.week}>
      {weekdays.map((day) => (
        <div key={day} className={styles.dayNumber}>
          {day}
        </div>
      ))}
    </div>
  );
};

const Calendar: React.FC = () => {
  const WeekDayNames = (): JSX.Element => (
    <div className={styles.weekDayNames}>
      {['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div key={day} className={styles.day}>
          {day}
        </div>
      ))}
    </div>
  );

  const [month, setMonth] = useState(new Month('January'));
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <section className={styles.calendar}>
      <Select optionValues={months} value={month} setValue={setMonth} />
      <WeekDayNames />
      {month.parseMonth().map((days, index) => (
        <Week weekdays={days} key={index} index={index} month={month} />
      ))}
    </section>
  );
};

export default Calendar;
