import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Graph0() {
  const { habitName, habitId } = useParams();
  const [data, setData] = useState([]);

  const getHabitData = useCallback(async () => {
    try {
      const habitdata = await axios.post("http://localhost:8800/habit/inputs", {
        habitId: habitId,
      });
      console.log(habitName);
      console.log(habitId);
      if (habitdata) {
        console.log("Thank you God!!!");
        const formattedData = habitdata.data.map((element) => ({
          ...element,
          date: dayjs(element.date).format("DD/MM"),
          inputdata: (() => {
            return element.input === "true" ? 1 : 0;
          })(),
        }));
        
        setData(formattedData);
        console.log("data:");
        console.log(data);
      } else {
        console.log("....");
      }
    } catch (err) {
      console.log(err);
    }
  }, [habitName, habitId]);

  useEffect(() => {
    getHabitData();
  }, [getHabitData]);

  const navigate = useNavigate();

  return (
    <>
      <div>
        <p
          className="position-absolute top-0 end-0 px-5 py-3 "
          onClick={() => navigate("/home")}
        >
          <i className="fa fa-times fa-xl" aria-hidden="true"></i>
        </p>
        <h3 className="px-3 py-3">{habitName}</h3>
        <ResponsiveContainer width="70%" height="40%" aspect={3}>
          <LineChart data={data} width={100}>
            <CartesianGrid />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line dataKey="inputdata" stroke="#54B4D3" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
