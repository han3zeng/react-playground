import { rest } from 'msw'
import config from '../config';
const { resourceServerOrigin } = config;

export const handlers = [
  rest.get(`${resourceServerOrigin}/initialization`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        csrfToken: '',
      })
    )
  }),
  rest.post(`${resourceServerOrigin}/story/get-all`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ok: true,
        message: '',
        stories: [
          {
            title: 'Story One',
            storyId: 0
          }
        ]
      }),
    )
  }),
]
