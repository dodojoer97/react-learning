import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event"

import Greeting from './Greeting';

describe("<Greeting />", () => {
    test('renders Hello world as a text', () => {
      render(<Greeting />);
      const helloWorldEL = screen.getByText("Hello World", {exact: false});
      expect(helloWorldEL).toBeInTheDocument();
    });

    test("renders good to see you if the buttons was NOT clicked", () => {
      render(<Greeting />);
      const paragraphEl = screen.getByText("good to see you", {exact: false});
      expect(paragraphEl).toBeInTheDocument();
    })

    test("renders 'Changed!' if the buttons was clicked", () => {
        // Arrange
        render(<Greeting />);
      
        // Act
        const button = screen.getByRole("button")
        userEvent.click(button)  

        // Assert
        const paragraphEl = screen.getByText("Changed!", {exact: true});
        expect(paragraphEl).toBeInTheDocument();
    })

    test("does not render 'good to see you' if the button was clicked", () => {
        // Arrange
        render(<Greeting />);
      
        // Act
        const button = screen.getByRole("button")
        userEvent.click(button)  

        // Assert
        const paragraphEl = screen.queryByText("good to see you", {exact:false});
        expect(paragraphEl).toBeNull()
    })
})

