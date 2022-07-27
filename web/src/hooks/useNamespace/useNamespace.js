import { useEffect,
         useState } from "react";
import { validateNamespace } from "utils";

function useNamespace(entity, namespace) {
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState("0");

  useEffect(() => {
    (async () => {
      try {
        setLoading("1");
        if (namespace) {
          const result = await validateNamespace(entity, namespace);
          if (result) setValid(true);
          else setValid(false);
          setLoading("2");
        }
      }
      catch (e) { setLoading("9"); }
    })();
  }, [entity, namespace]);

  return [valid, loading];
}

export default useNamespace;
