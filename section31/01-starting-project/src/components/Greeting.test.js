import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

test('renders Hello world as a text', () => {
  render(<Greeting />);
  const helloWorldEL = screen.getByText("Hello World", {exact: false});
  expect(helloWorldEL).toBeInTheDocument();
});
