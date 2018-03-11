import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogService from './services/blogs'
jest.mock('./services/blogs')

const user = {
    username: 'kayttaja',
    token: 'kayttajanRandomToken1',
    name: 'Kayttaja'
}

describe('<App/>', () => {
    let app

    describe('if user is not logged in', () => {
        beforeEach(() => {
            app = mount(<App />)
        })

        it('only login form is rendered', () => {
            app.update()
            const loginForm = app
                .find(LoginForm)
            const blogContent = app
                .find(Blog)
            expect(loginForm.text())
                .toContain('kirjaudu')
            expect(blogContent)
                .not
                .toContain('Token testissä')
        })
    })

    describe('if user is logged in', () => {
        beforeEach(() => {
            window
                .localStorage
                .setItem('loggedBlogAppUser', JSON.stringify(user))
            app = mount(<App />)
        })

        it('all notes are rendered', () => {
            app.update()

            const blogContent = app
                .find(Blog)
            expect(blogContent.length)
                .toEqual(BlogService.blogs.length)
        })
    })
})