import { render, screen } from '@testing-library/react';
import Async from './Async';

describe("Async component", () => {
    test("renders posts", async () => {
        window.fetch = jest.fn(); 
        window.fetch.mockResolvedValueOnce({
            json: async () => {
                return [
                    {
                        id: 'p1',
                        title: "first mock post"
                    }
                ]
            }
        })

        // Arrange
        render(<Async />)
        
        // Act

        // Assert
        const listItemElements = await screen.findAllByRole("listitem")
        expect(listItemElements).not.toHaveLength(0)
    })
})