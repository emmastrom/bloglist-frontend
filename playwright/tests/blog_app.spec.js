const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createNote, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'testUser',
        name: 'Test User',
        password: 'SuperTests'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('testUser')
      await page.getByTestId('password').fill('SuperTests')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('testUser')
      await page.getByTestId('password').fill('wrong')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('error: wrong username or password')).toBeVisible()
      await expect(page.getByText('Test User logged in')).not.toBeVisible()
    })
  })


  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
      await loginWith(page, 'testUser', 'SuperTests')
      await request.post('/api/login', {
        data: {
          username: 'testUser',
          password: 'SuperTests'
        }
      })
      await page.goto('/')
    })

    test('a new blog can be created', async ({ page }) => {
      await expect(page.getByText('blogs')).toBeVisible()
      await page.getByRole('button', { name: 'new blog' }).click()
      await expect(page.getByText('create new blog')).toBeVisible()

      await page.getByTestId('title-textbox').fill('testing blog')
      await page.getByTestId('author-textbox').fill('Ada Lovelace')
      await page.getByTestId('url-textbox').fill('www.test.form')

      await page.getByRole('button', { name: 'create' }).click()
      const notificationDiv = await page.locator('.notification')
      await expect(notificationDiv).toContainText('new blog testing blog added')
      await expect(page.getByText('testing blog')).toBeVisible
    })

    test('a blog can be liked', async ({ page, request }) => {
      await createBlog(page, 'testing again', 'Newt Estman', 'www.test.new')
      await expect(page.getByText('testing again Newt Estman')).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click()
      const initialLikes = await page.locator('.blog-likes')
      await expect(initialLikes).toContainText('0')
      await page.getByRole('button', { name: 'like' }).click()
      const likesAfterClick = await page.locator('.blog-likes')
      await expect(likesAfterClick).toContainText('1')
    })
  })

})