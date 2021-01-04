import * as React from 'react';
import Select from '../components/Select';

// markup
const IndexPage: React.FC = () => {
  const [month, setMonth] = React.useState('January');
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
    <Select optionValues={months} value={month} setValue={setMonth}>
      Hello World
    </Select>
  );
};

export default IndexPage;
