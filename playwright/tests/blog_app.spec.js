const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createNote, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                username: 'testUser',
                name: 'Test User',
                password: 'SuperTests',
            },
        })
        await request.post('/api/users', {
            data: {
                username: 'secondUser',
                name: 'second',
                password: 'moreTests',
            },
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

            await expect(
                page.getByText('error: wrong username or password')
            ).toBeVisible()
            await expect(
                page.getByText('Test User logged in')
            ).not.toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page, request }) => {
            await loginWith(page, 'testUser', 'SuperTests')
            await request.post('/api/login', {
                data: {
                    username: 'testUser',
                    password: 'SuperTests',
                },
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
            const notificationDiv = page.locator('.notification')
            await expect(notificationDiv).toContainText(
                'new blog testing blog added'
            )
            await expect(page.getByText('testing blog')).toBeVisible
        })

        test('a blog can be liked', async ({ page }) => {
            await createBlog(
                page,
                'testing again',
                'Newt Estman',
                'www.test.new'
            )
            await expect(
                page.getByText('testing again Newt Estman')
            ).toBeVisible()
            await page.getByRole('button', { name: 'view' }).click()
            const initialLikes = await page.locator('.blog-likes')
            await expect(initialLikes).toContainText('0')
            await page.getByRole('button', { name: 'like' }).click()
            const likesAfterClick = page.locator('.blog-likes')
            await expect(likesAfterClick).toContainText('1')
        })

        test('a blog can be deleted', async ({ page }) => {
            await createBlog(
                page,
                'testing again',
                'Newt Estman',
                'www.test.new'
            )
            await expect(
                page.getByText('testing again Newt Estman')
            ).toBeVisible()
            await page.reload()
            await page.getByRole('button', { name: 'view' }).click()
            page.on('dialog', (dialog) => dialog.accept())
            await page.getByRole('button', { name: 'remove' }).click()
            const notificationDiv = page.locator('.notification')
            await notificationDiv.getByText('blog deleted').waitFor()
            await expect(
                page.getByText('testing again Newt Estman')
            ).not.toBeVisible()
        })

        test('remove button is not seen if logged in is not the creator', async ({
            page,
        }) => {
            await createBlog(
                page,
                'testing again',
                'Newt Estman',
                'www.test.new'
            )
            await page.getByRole('button', { name: 'logout' }).click()
            await loginWith(page, 'secondUser', 'moreTests')
            await expect(page.getByText('second logged in')).toBeVisible()
            await page.getByRole('button', { name: 'view' }).click()
            await expect(page.getByText('www.test.new')).toBeVisible()
            await expect(
                page.getByRole('button', { name: 'remove' })
            ).not.toBeVisible()
        })

        test('blogs are in order from most to least likes', async ({
            page,
        }) => {
            await createBlog(
                page,
                'testing again',
                'Newt Estman',
                'www.test.new'
            )
            await createBlog(page, 'Create', 'Clair Eaton', 'www.creator.com')
            await createBlog(page, 'Computers', 'C. Prompter', 'www.comp.ter')
            // Likes blog: Computers
            await page.getByRole('button', { name: 'view' }).nth(0).click()
            await page.getByRole('button', { name: 'like' }).click()
            await page.getByRole('button', { name: 'like' }).click()
            await page.getByRole('button', { name: 'hide' }).click()
            //Likes blog: testing again
            await page.getByRole('button', { name: 'view' }).nth(2).click()
            await page.getByRole('button', { name: 'like' }).click()
            await page.reload()
            await page.getByText('testing again Newt Estman').waitFor()
            const blogs = page.locator('.blog-info')
            const expectedBlogs = [
                'Computers C. Prompter',
                'testing again Newt Estman',
                'Create Clair Eaton',
            ]
            expect(blogs).toContainText(expectedBlogs)
        })
    })
})
