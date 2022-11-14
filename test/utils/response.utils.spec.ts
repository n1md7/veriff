import { ResponseUtils } from '../../src/utils';

describe('getResponse', () => {
  it('should verify when throws 500', () => {
    jest.spyOn(Math, 'floor').mockReturnValueOnce(9);
    const code = 200;
    const data = 'My data string';
    const response = ResponseUtils.getResponse(code, data);

    expect(response).toEqual([500, expect.any(String)]);
  });

  it('should verify when not throws 500', () => {
    jest.spyOn(Math, 'floor').mockReturnValueOnce(7);
    const code = 200;
    const data = 'My data string';
    const response = ResponseUtils.getResponse(code, data);

    expect(response).toEqual([code, data]);
  });
});
