import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const nextUrl = query.get("next");

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 5000);
    }
  }, [nextUrl]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-300 border-t-orange-500"></div>
    </div>
  );
};

export default Loading;
