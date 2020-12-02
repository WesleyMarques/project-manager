import * as request from 'supertest';
import * as httpStatus from 'http-status-codes';

import app from '../../config/server';
import Complain from './complain.model';



const generateComplains = async (num: number, city?: string) => {
    const complains = []
    const cityOptions = ["cg", "sp", "rj"]
    const provincyOptions = ["pb", "sp", "rj"]
    const countryOptions = ["brasil", "peru", "argentina"]
    for (let index = 0; index < num; index++) {
        const randomValue = Math.floor(10 * Math.random());
        const complainMock = {
            title: "teste" + randomValue,
            description: "description" + randomValue,
            company: "company" + randomValue,
            locale: {
                city: city || cityOptions[Math.floor(Math.random() * cityOptions.length)],
                provincy: provincyOptions[Math.floor(Math.random() * provincyOptions.length)],
                country: countryOptions[Math.floor(Math.random() * countryOptions.length)]
            }
        }
        complains.push(complainMock);
    }
    return complains;

}

describe('Complains API', () => {

    afterAll(async () => {
        await Complain.remove({});
    });

    describe('POST /api/v1/complain', () => {
        it('should create a new complain when request is ok', async () => {
            let complainMock = await generateComplains(1)
            return request(app)
                .post('/api/v1/complain')
                .send(complainMock[0])
                .expect(httpStatus.CREATED)
                .then((res: any) => {
                    expect(res.body).toMatchObject(complainMock[0])
                });
        });
    });

    describe('GET /api/v1/complain', () => {
        let complains:any[] = []
        beforeEach( async () => {
            complains = []
            await Complain.remove({});
            complains = await generateComplains(5)
            complains.forEach(async (complain) => {
                await Complain.create(complain);
            });
        });
        
        it('should get all Complains', () => {
            return request(app)
                .get('/api/v1/complain')
                .expect(httpStatus.OK)
                .then(async (res) => {
                    expect(res.body).toBeInstanceOf(Array)
                    expect(res.body).toHaveLength(complains.length);
                });
        });

        it('should get all Complains with pagination', () => {
            return request(app)
                .get('/api/v1/complain')
                .query({ page: 2, perPage: 1 })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).toBeInstanceOf(Array);
                    expect(res.body).toHaveLength(1);
                });
        });
    });

    describe('GET /api/v1/complain/insights', () => {
        let complains:any[] = []
        beforeEach( async () => {
            complains = [];
            await Complain.remove({});
            complains = complains.concat(await generateComplains(5, "cg"))
            complains = complains.concat(await generateComplains(3, "rj"))
            complains = complains.concat(await generateComplains(2, "sp"))
            complains.forEach(async (complain) => {
                await Complain.create(complain);
            });
        });

        it('should get correct insight for cg', () => {
            return request(app)
                .get('/api/v1/complain/insights')
                .query({ city: "cg"})
                .expect(httpStatus.OK)
                .then(async (res) => {
                    expect(res.body).toBe(5);
                });
        });

        it('should get correct insight for rj', () => {
            return request(app)
                .get('/api/v1/complain/insights')
                .query({ city: "rj"})
                .expect(httpStatus.OK)
                .then(async (res) => {
                    expect(res.body).toBe(3);
                });
        });

        it('should get correct insight for sp', () => {
            return request(app)
                .get('/api/v1/complain/insights')
                .query({ city: "sp"})
                .expect(httpStatus.OK)
                .then(async (res) => {
                    expect(res.body).toBe(2);
                });
        });

    });
});