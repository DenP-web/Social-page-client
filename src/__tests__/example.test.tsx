import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';

test('renders a message', () => {
  render(<div>Hello World</div>);
  expect(screen.getByText('Hello World')).toBeInTheDocument();
});