import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { GET_STORIES } from '../api/graphql';
import Stories from './Stories';

const mocks = [
  {
    request: {
      query: GET_STORIES,
    },
    result: {
      data: {
        getStories: {
          id: 'test-id',
          userId: 'test-user-id',
          stories: [
            {
              storyId: 'test-story-id',
              title: 'test-title',
            }
          ],
        },
      },
    },
  },
];

test('renders Stories.js without error', async () => {
  render((
    <MockedProvider mocks={mocks} addTypename={false}>
      <Stories csrfToken="test-csrf-token" />
    </MockedProvider>
  ), { wrapper: MemoryRouter });
  expect(await screen.findByText(/test-title/)).toBeInTheDocument();
});
