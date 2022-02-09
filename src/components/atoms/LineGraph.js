import React from 'react'
 import { Chart as ChartJS } from 'chart.js/auto'
import { Line }            from 'react-chartjs-2'

function LineGraph() {
    const data={
        labels:['jan21', 'Feb21', 'Mar21', 'Apr21','May21'],
        datasets:[
            {
                label:'Total Policy Sales 2021',
                data:[5482, 412, 3112, 7682,4212],
                // borderColor:['rgba(255,206,86,0.2)'],
                backgroundColor:'Blue',
                // pointBackgroundColor:['yellow'],
                // pointBorderColor:['rgba(255,206,86,0.2)']
            }
        ]
    }

    const options={
      tension:0.3,
        title:{
            display:true,
            text:"Line chart"
        },
        scales:{
            yAxes:[
                {
                    ticks:{
                        min:0,
                        max:7000,
                        stepSize:1000
                    }
                }
            ]
        
    }
   
    }
    return (
        <div className='Chart' style={{width:"100%"}}>       
             <Line data={data} options={options}/>
        </div>

    )

}

export default LineGraph
