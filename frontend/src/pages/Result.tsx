import { useLocation, Link } from "react-router-dom";

export default function Result() {
  const { state }: any = useLocation();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {state?.success ? (
        <>
          <h1 className="text-3xl font-bold text-green-600 mb-4">Booking Confirmed 🎉</h1>
          <Link to="/" className="text-blue-600 underline">Go Home</Link>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-red-600 mb-4">Booking Failed ❌</h1>
          <Link to="/" className="text-blue-600 underline">Try Again</Link>
        </>
      )}
    </div>
  );
}
