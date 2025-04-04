import moment from "moment";
import { useState } from "react";

const ShowMeToday = () => {
  const [date] = useState(moment().format());

  return <div>{date}</div>;
};

export default ShowMeToday;
