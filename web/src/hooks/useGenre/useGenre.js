import { useEffect, useState } from "react";
import { validateGenre } from "utils";

function useGenre(genre) {
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState("0");

  useEffect(() => {
    (async () => {
      try {
        setLoading("1");
        const result = await validateGenre(genre);
        if (result) setValid(true);
        else setValid(false);
        setLoading("2");
      }
      catch (e) { setLoading("9"); }
    })();
  }, [genre]);

  return [valid, loading];
}

export default useGenre;
