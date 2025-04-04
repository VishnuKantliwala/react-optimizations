import { lazy, Suspense } from "react";
import { Loader } from "../../components/Loader/Loader";
const ShowMeToday = lazy(
  () => import("../../components/ShowMeToday/ShowMeToday")
);
const Calendar = () => {
  return (
    <>
      <h2>Date</h2>
      <Suspense fallback={<Loader />}>
        <ShowMeToday />
      </Suspense>
    </>
  );
};

export default Calendar;
