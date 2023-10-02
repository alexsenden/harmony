import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage from '.'

const server = setupServer(
  rest.get(
    `${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/example`,
    (req, res, ctx) => {
      const echoString = req.url.searchParams.get('echo')
      return res(ctx.json({ echo: echoString }))
    }
  )
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('HomePage', () => {
  it("displays 'Hello World!'", () => {
    render(<HomePage />)

    // queryBy will return null if not found, or return the component if it is
    expect(screen.queryByText('Hello World!', { exact: false })).toBeDefined()
  })

  it('displays the echoed text from the API', () => {
    render(<HomePage />)

    // findBy will wait for the text to appear, then return it
    expect(screen.findByText('Echo_Me_Please!')).toBeDefined()
  })
})
