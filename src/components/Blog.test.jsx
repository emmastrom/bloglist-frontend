import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Testing is important',
  author: 'Ada Lovelace',
  url: 'www.always.test',
  likes: 6,
  user: { username: 'TestUser', name: 'Test User' }
}

test('renders content', () => {

  const { container } = render(<Blog blog={blog} />)

  screen.debug()

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Testing is important'
  )
})

test('clicking the view button shows more info on blog', async () => {

  const mockHandler = vi.fn()

  const user = userEvent.setup()

  const { container } = render(
    <Blog blog={blog} clickView={mockHandler} currentUser={user}/>
  )

  const button = screen.getByText('view')
  await user.click(button)

  screen.debug()

  const url = container.querySelector('.blog-url')
  const likes = container.querySelector('.blog-likes')
  const username = container.querySelector('.blog-creator')
  expect(url).toHaveTextContent('www.always.test')
  expect(likes).toHaveTextContent('like')
  expect(username).toHaveTextContent('Test User')
})