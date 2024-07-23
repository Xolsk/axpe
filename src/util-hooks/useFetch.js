import { useState, useEffect, useCallback } from "react";

export const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (requestOptions = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: requestOptions.body,
          ...requestOptions,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [url, method]
  );

  useEffect(() => {
    if (method === "GET" && url !== null && data === null) {
      fetchData();
    }
  }, [url, method, fetchData, data]);

  const clear = () => {
    setLoading(false);
    setError(null);
    setData(null);
  };

  return { data, loading, error, execute: fetchData, clear };
};
