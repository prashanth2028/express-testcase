import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/index'; 

let mongoServer;

// Setup and teardown hooks for MongoDB
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe('CRUD operations for User', () => {
    let userId;

    // Test: Create a user
    it('should create a new user', async () => {
        const response = await request(app)
            .post('/crud/users')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'password123',
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('_id');
        userId = response.body.user._id;
    });

    // Test: Get all users
    it('should fetch all users', async () => {
        const response = await request(app).get('/crud/users');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Test: Get a user by ID
    it('should fetch a user by ID', async () => {
        const response = await request(app).get(`/crud/user/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', userId);
    });

    // Test: Update a user
    it('should update a user', async () => {
        const response = await request(app)
            .put(`/crud/user/${userId}`)
            .send({
                name: 'John Updated',
                email: 'johnupdated@example.com',
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('user');
        expect(response.body.user.name).toBe('John Updated');
        expect(response.body.user.email).toBe('johnupdated@example.com');
    });

    // Test: Delete a user
    it('should delete a user', async () => {
        const response = await request(app).delete(`/crud/user/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User deleted successfully');
    });

    // Test: Fetch deleted user
    it('should return 404 for a deleted user', async () => {
        const response = await request(app).get(`/crud/user/${userId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'User not found');
    });
});
