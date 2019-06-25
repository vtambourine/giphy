import Provider from './provider';
import { URL } from 'url';

describe('Provider', () => {
  const query = 'kittens';
  const defaultOptions = {
    language: 'en',
    limit: 5,
    offset: 0,
    rating: 'G',
  };

  let provider: Provider;
  let fetchMock = jest.fn().mockResolvedValue([]);
  window.fetch = fetchMock;

  function lastCallOffset() {
    const calledURL = fetchMock.mock.calls[fetchMock.mock.calls.length - 1];
    return +new URL(calledURL).searchParams.get('offset');
  }

  beforeEach(() => {
    provider = new Provider(query);
  });

  afterEach(() => {
    fetchMock.mockClear();
  });

  it('creates new provider with default options', () => {
    provider.next();

    expect(fetchMock).toBeCalled();
    expect(fetchMock).toBeCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(expect.any(String));

    const calledOptions = new URL(fetchMock.mock.calls[0]).searchParams;
    expect(calledOptions.get('q')).toEqual(query);
    expect(calledOptions.get('lang')).toEqual(defaultOptions.language);
    expect(+calledOptions.get('limit')).toEqual(defaultOptions.limit);
    expect(+calledOptions.get('offset')).toEqual(defaultOptions.offset);
    expect(calledOptions.get('rating')).toEqual(defaultOptions.rating);
  });

  it('creates new provider with custom options', () => {
    const options = {
      language: 'ru',
      limit: 15,
      offset: 10,
      rating: 'A',
    };
    const provider = new Provider(query, options);
    provider.next();

    expect(fetchMock).toBeCalled();
    expect(fetchMock).toBeCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(expect.any(String));

    const calledOptions = new URL(fetchMock.mock.calls[0]).searchParams;
    expect(calledOptions.get('q')).toEqual(query);
    expect(calledOptions.get('lang')).toEqual(options.language);
    expect(+calledOptions.get('limit')).toEqual(options.limit);
    expect(+calledOptions.get('offset')).toEqual(options.offset);
    expect(calledOptions.get('rating')).toEqual(options.rating);
  });

  it('fetches consecutive batches of images', () => {
    provider.next();
    expect(lastCallOffset()).toEqual(0);
    provider.next();
    expect(lastCallOffset()).toEqual(5);
    provider.next();
    expect(lastCallOffset()).toEqual(10);

    const calledOptions = new URL(fetchMock.mock.calls[2]).searchParams;
    expect(calledOptions.get('q')).toEqual(query);
  });

  it('fetches consecutive batches of images with custom step', () => {
    const provider = new Provider(query, {
      limit: 20,
    });

    provider.next();
    expect(lastCallOffset()).toEqual(0);
    provider.next();
    expect(lastCallOffset()).toEqual(20);
    provider.next();
    expect(lastCallOffset()).toEqual(40);

    const calledOptions = new URL(fetchMock.mock.calls[2]).searchParams;
    expect(calledOptions.get('q')).toEqual(query);
  });
});
