import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
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

  const div = container.querySelector('.blog-info')
  expect(div).toHaveTextContent(
    'Testing is important'
  )
})

test('clicking the view button shows more info on blog', async () => {

  const user = userEvent.setup()

  const { container } = render(
    <Blog blog={blog} currentUser={user}/>
  )

  const button = screen.getByText('view')
  await user.click(button)

  const url = container.querySelector('.blog-url')
  const likes = container.querySelector('.blog-likes')
  const username = container.querySelector('.blog-creator')
  expect(url).toHaveTextContent('www.always.test')
  expect(likes).toHaveTextContent('like')
  expect(username).toHaveTextContent('Test User')
})

test('clicking the like button twice calls props twice', async () => {

  const mockHandler = vi.fn()

  const user = userEvent.setup()

  render(
    <Blog blog={blog} updateBlog={mockHandler} currentUser={user} />
  )

  const button = screen.getByText('view')
  await user.click(button)
  console.log(mockHandler.mock.calls)
  const likebutton = screen.getByText('like')
  await user.click(likebutton)
  await user.click(likebutton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})