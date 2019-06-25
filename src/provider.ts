const API_KEY = '';

interface ProviderOptions {
  language?: string;
  limit?: number;
  offset?: number;
  rating?: string;
}

class Provider {
  options: ProviderOptions;

  constructor(private query: string, options: ProviderOptions = {}) {
    this.options = {
      language: 'en',
      limit: 5,
      offset: 0,
      rating: 'G',
      ...options,
    };
  }

  get url() {
    const { language, limit, offset, rating } = this.options;
    return `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${this.query}&limit=${limit}&offset=${offset}&rating=${rating}&lang=${language}`;
  }

  next() {
    const url = this.url;
    this.options.offset += this.options.limit;
    return fetch(url);
  }
}

export default Provider;
