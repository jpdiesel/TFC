import * as chai from 'chai';
import * as sinon from 'sinon';
import { Response } from 'superagent';
import { app } from '../app';
import User from '../database/models/user';
// @ts-ignore
import chaiHttp = require('chai-http');




chai.use(chaiHttp);

const { expect } = chai;

describe('Ao Logar usuário', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, 'findOne')
      .resolves(undefined);
  });

  afterEach(() => {
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Verifica se não é possível logar com um email errado', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admidasdan@admin.com',
        password: 'secret_admin',
      });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.eq('Incorrect email or password');

  });

  it('Verifica se não é possível logar com uma senha errada', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'KKKKKKKKKKKKKKKKKK',
      });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.eq('Incorrect email or password');
  });

  it('Verifica se não é possível logar sem digitar email', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: '',
        password: 'secret_admin',
      });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.eq('All fields must be filled');
  });
  it('Verifica se não é possível logar sem digitar senha', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: '',
      });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.eq('All fields must be filled');
  });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});
