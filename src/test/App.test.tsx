import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';


test('should calculate the correct age', () => {
  const { getByLabelText, getByText } = render(<App />);

  const dayInput = getByLabelText('DAY');
  const monthInput = getByLabelText('MONTH');
  const yearInput = getByLabelText('YEAR');

  fireEvent.change(dayInput, { target: { value: '4' } });
  fireEvent.change(monthInput, { target: { value: '3' } });
  fireEvent.change(yearInput, { target: { value: '1993' } });

  const submitButton = screen.getByRole('button');

  fireEvent.click(submitButton);

  const years = getByText('30');
  const months = getByText('3');
  const days = getByText('26');

  expect(years).toBeInTheDocument();
  expect(months).toBeInTheDocument();
  expect(days).toBeInTheDocument();
});
