const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.goto('/blogs')
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByTestId('title-textbox').fill(title)
  await page.getByTestId('author-textbox').fill(author)
  await page.getByTestId('url-textbox').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(title.concat(` ${author}`)).waitFor()
}

export { loginWith, createBlog }