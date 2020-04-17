const { expect } = require('chai');

const createServer = require('../../../test/helpers/request');

describe('Health Endpoints', () => {
  let request;
  let shutdown;

  before(async () => {
    ({ request, shutdown } = await createServer());
  });

  after(async () => {
    await shutdown();
  });

  describe('/api/health/', () => {
    describe('GET', () => {
      it('return the health state of the server', () =>
        request.get('/api/health')
          .expect(200)
          .then(({ body }) => {
            expect(body).to.be.eql({});
          })
      );
    });
  });
});
