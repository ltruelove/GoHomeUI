import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// @ts-ignore
export default function MoistureChart(props) {
    const data = props.data;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={1000}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="DateLabel" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Moisture" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    );
}
