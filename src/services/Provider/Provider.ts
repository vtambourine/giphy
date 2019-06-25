const GITHPY_API_KEY = process.env.REACT_APP_GITHPY_API_KEY;

interface ProviderOptions {
  language: string;
  limit: number;
  offset: number;
  rating: string;
}

class Provider {
  query: string;
  options: ProviderOptions;

  constructor(query: string, options: Partial<ProviderOptions> = {}) {
    this.query = encodeURIComponent(query);
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
    return `https://api.giphy.com/v1/gifs/search?api_key=${GITHPY_API_KEY}&q=${this.query}&limit=${limit}&offset=${offset}&rating=${rating}&lang=${language}`;
  }

  next(): Promise<{ data: GIF[] }> {
    const url = this.url;
    this.options.offset += this.options.limit;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => resolve(response.json()))
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  }
}

export default Provider;
