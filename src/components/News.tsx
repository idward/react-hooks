import React, { FC, useEffect, useState, useRef, SyntheticEvent, FormEvent } from 'react';
import axios from 'axios';

interface INewsProps {
  [key: string]: any;
}

interface NewsData {
  [key: string]: any;
}

interface ErrorType {
  errorMessage: string;
}

type DataType<T> = T | null;

const News: FC<INewsProps> = () => {
  const [results, setResults] = useState<NewsData[]>([]);
  const [query, setQuery] = useState<string>('reacthooks');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<DataType<ErrorType>>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const catchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
      console.log(response.data);
      const {
        data: { hits },
      } = response;
      setResults(hits);
    } catch (ex) {
      setError({ errorMessage: ex.message });
    }

    setLoading(false);
  };

  const setSearchKey = (event: SyntheticEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const searchNews = (event: FormEvent) => {
    event.preventDefault();
    catchNews();
    setQuery('');
    if (searchInputRef && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  useEffect(() => {
    catchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderData = () => {
    if (loading) {
      return <h4>Loading...</h4>;
    }

    if (error) {
      return <h4>{error.errorMessage}</h4>;
    }

    return (
      <ul>
        {results.map((result: NewsData) => {
          return <li key={result.objectID}>{result.title}</li>;
        })}
      </ul>
    );
  };

  return (
    <div>
      <form onSubmit={searchNews}>
        <input
          type="text"
          placeholder="serach"
          value={query}
          ref={searchInputRef}
          onChange={setSearchKey}
        />
        <button type="submit">Search</button>
      </form>
      {/* <pre>{JSON.stringify(results, null, 2)}</pre> */}
      {renderData()}
    </div>
  );
};

export default News;
