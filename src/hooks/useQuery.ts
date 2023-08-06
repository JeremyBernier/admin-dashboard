"use client";

import React, { useEffect, useState } from "react";

const useQuery = (url: string) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(undefined);

  useEffect(() => {
    setLoading(true);
    setError(undefined);
    (async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
        setError(undefined);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    })();
  }, [url]);

  return { data, loading, error };
};

export default useQuery;
