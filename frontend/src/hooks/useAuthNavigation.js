import { useEffect, useState } from "react";

const validPages = ["home", "login", "signup", "forgot"];

function getPageFromPath() {
  const page = window.location.pathname.replace("/", "") || "home";
  return validPages.includes(page) ? page : "home";
}

function useAuthNavigation() {
  const [page, setPage] = useState(getPageFromPath);

  useEffect(() => {
    const handlePopState = () => setPage(getPageFromPath());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (nextPage) => {
    const destination = validPages.includes(nextPage) ? nextPage : "home";
    window.history.pushState(
      {},
      "",
      destination === "home" ? "/" : `/${destination}`,
    );
    setPage(destination);
  };

  return { page, navigate };
}

export default useAuthNavigation;
