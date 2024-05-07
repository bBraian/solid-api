import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe('Create Gym (2e2)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })


  it('should be able to create a gym', async () => {

    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        description: 'Some description',
        phone: '1199999999',
        latitude: -27.2092052,
        longitude: -49.6401091,

      })

    expect(response.statusCode).toEqual(201)
  })
})