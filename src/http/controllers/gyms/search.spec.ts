import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe('Search Gyms (2e2)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })


  it('should be able to find gyms', async () => {

    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        description: 'Some description',
        phone: '1199999999',
        latitude: -27.2092052,
        longitude: -49.6401091,

      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Typescript Gym',
        description: 'Some description',
        phone: '1199999999',
        latitude: -27.2092052,
        longitude: -49.6401091,

      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'Javascript'
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Javascript Gym'
      })
    ])
  })
})