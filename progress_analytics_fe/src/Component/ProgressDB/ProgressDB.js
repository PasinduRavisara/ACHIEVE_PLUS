import React from 'react'
import "./progressdb.css"
import Navbar from "../Navbar"
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function HomeRightbar() {
  const data = [
    {
      "name": "Page A",
      "uv": 1000,
      "fill": "#bab4b4"
    },
    {
      "name": "Page B",
      "uv": 800,
      "fill": "#bab4b4"
    },
    {
      "name": "Page C",
      "uv": 900,
      "fill": "#bab4b4"
    },
    {
      "name": "Page D",
      "uv": 2020,
      "fill": "#82ca9d"
    },
    {
      "name": "Page E",
      "uv": 880,
      "fill": "#bab4b4"
    },
    {
      "name": "Page F",
      "uv": 900,
      "fill": "#bab4b4"
    },
    {
      "name": "Page G",
      "uv": 550,
      "fill": "#bab4b4"
    }
  ]

  const data1 = [
    {
      "name": "Page A",
      "uv": 1000,
      "fill": "#bab4b4"
    },
    {
      "name": "Page B",
      "uv": 800,
      "fill": "#bab4b4"
    },
    {
      "name": "Page C",
      "uv": 900,
      "fill": "#bab4b4"
    },
    {
      "name": "Page D",
      "uv": 2020,
      "fill": "#FF1493"
    },
    {
      "name": "Page E",
      "uv": 880,
      "fill": "#bab4b4"
    },
    {
      "name": "Page F",
      "uv": 900,
      "fill": "#bab4b4"
    },
    {
      "name": "Page G",
      "uv": 550,
      "fill": "#bab4b4"
    }
  ]

  const data2 = [
    {
      "name": "Page A",
      "uv": 2000,
      "fill": "#bab4b4"
    },
    {
      "name": "Page B",
      "uv": 800,
      "fill": "#bab4b4"
    },
    {
      "name": "Page C",
      "uv": 900,
      "fill": "#bab4b4"
    },
    {
      "name": "Page D",
      "uv": 4000,
      "fill": "#B0E0E6"
    },
    {
      "name": "Page E",
      "uv": 880,
      "fill": "#bab4b4"
    },
    {
      "name": "Page F",
      "uv": 900,
      "fill": "#bab4b4"
    },
    {
      "name": "Page G",
      "uv": 550,
      "fill": "#bab4b4"
    }
  ]

  const data3 = [
    {
      "name": "Page A",
      "Task_Created": 4000,
      "Task_Completed": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "Task_Created": 3000,
      "Task_Completed": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "Task_Created": 2000,
      "Task_Completed": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "Task_Created": 2780,
      "Task_Completed": 3908,
      "amt": 2000
    },
    {
      "name": "Page E",
      "Task_Created": 1890,
      "Task_Completed": 4800,
      "amt": 2181
    },
    {
      "name": "Page F",
      "Task_Created": 2390,
      "Task_Completed": 3800,
      "amt": 2500
    },
    {
      "name": "Page G",
      "Task_Created": 3490,
      "Task_Completed": 4300,
      "amt": 2100
    }
  ]


  return (
    <div className='mainHomeRightbar'>
      <Navbar/>
      <div>
        <div className='ItemContainer'>
        <div className='ItemContainer1'>
          <div className='subitemContainer'>
            <p className='taskProgress'>Task Progress</p>
            <p className='taskCounter'>202</p>
            <p className='currentMonth1'>Current Month</p>
          </div>
          <div className='barchartContainer'>
          <BarChart width={166} height={100} data={data}>
          <Tooltip />
          <Bar dataKey="uv" fill="fill" />
          </BarChart>
          </div>
        </div>
        <div className='ItemContainer1'>
        <div className='subitemContainer'>
            <p className='taskProgress'>Task Completed</p>
            <p className='taskCounter1'>301</p>
            <p className='currentMonth1'>Current Month</p>
          </div>
          <div className='barchartContainer'>
          <BarChart width={166} height={100} data={data1}>
          <Tooltip />
          <Bar dataKey="uv" fill="fill" />
          </BarChart>
          </div>
        </div>
        <div className='ItemContainer1'>
        <div className='subitemContainer1'>
            <p className='taskProgress'>Monthly Task Summary</p>
            <p className='taskCounter2'>2940</p>
            <p className='currentMonth1'>Current Month</p>
          </div>
          <div className='barchartContainer'>
          <BarChart width={166} height={100} data={data2}>
          <Tooltip />
          <Bar dataKey="uv" fill="fill" />
          </BarChart>
          </div>
        </div>

        </div>
        <div className='MiddleTaskChart'>
          <p className='TaskCreatedvsCompleted'>Task Created Vs Task Completed</p>
          <LineChart width={1200} height={250} data={data3}
            margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Task_Created" stroke="#8884d8" strokeWidth={3} />
            <Line type="monotone" dataKey="Task_Completed" stroke="#82ca9d" strokeWidth={3}/>
          </LineChart>
        </div>
      </div>
    </div>
  )
}
