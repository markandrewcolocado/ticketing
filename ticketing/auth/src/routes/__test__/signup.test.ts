import request from 'supertest'
import { app } from '../../app'

// sending a post request to signup route with valid inputs
it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)
})