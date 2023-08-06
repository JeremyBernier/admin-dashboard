"use client";

import { useCallback, useState } from "react";

const useMutation = (url: string, fetchParams = { method: "POST" }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(undefined);

  const mutationFn = useCallback(
    async (params) => {
      try {
        const res = await fetch(url, {
          ...fetchParams,
          ...(params && {
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
          }),
        });
        const data = await res.json();

        if (res?.status >= 400) {
          setError(data);
          return { status: res.status, data };
        }

        setData(data);
        setError(undefined);
        setLoading(false);
        return { status: 200, data };
      } catch (err) {
        setError(err);
        setLoading(false);
        return err;
      }
    },
    [url, fetchParams]
  );

  return [mutationFn, { data, loading, error }];
};

export default useMutation;
