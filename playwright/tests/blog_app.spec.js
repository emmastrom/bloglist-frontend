const { test, expect, beforeEach, describe } = require('@playwright/test')

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
      await page.getByTestId('username').fill('testUser')
      await page.getByTestId('password').fill('SuperTests')

      await page.getByRole('button', { name: 'login' }).click()
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
  })

})