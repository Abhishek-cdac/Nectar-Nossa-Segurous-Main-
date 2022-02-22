import React,{useState,useEffect} from 'react'
 import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import {getDashboardChartAPI} from "../.././services/authentication"
function LineGraph() {

    const[chart,setChart]=useState('')

    const handleDashboardGraphApI = async () => {
        const resp = await getDashboardChartAPI();
        setChart(resp);
        console.log("respppp", resp);
      };
      useEffect(() => {
        console.log("cdb", chart);
        handleDashboardGraphApI();
      }, []);

      const data={
        labels:chart && chart.data.policyChart.map((item) => item.month),
        datasets:[
            {
                label:`Total Policy Sales ${chart && chart.data.policyChart.map((item) =>item.year)[0]}`,
                data:chart && chart.data.policyChart.map(item => item.totalSales),
                borderColor:['#CCCCFF'],
                    fill:true
                // pointBackgroundColor:['yellow'],
                // pointBorderColor:['rgba(255,206,86,0.2)']
            }
        ]
    }

    const data2={
        labels:chart && chart.data.claimChart.map((item) => item.month),
        datasets:[
            {
                label:`Total Claims ${chart && chart.data.claimChart.map((item) =>item.year)[0]}`,
                data:chart && chart.data.claimChart.map(item => item.totalClaim),
                borderColor:['#76e5fc'],
                    fill:true
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
                        
                        suggestedMin:0,
                        max:100,
                        stepSize:10
                    }
                }
            ]
        
    }
   
    }
    return (
        <div style={{display:"flex",flexDirection:"row"}}>
            
            <div className="col-12 col-lg-12 mb-4">
        <h4>Total Polices 2022</h4>    
             <Line data={data} options={options}/>
             {console.log("ytfytf",chart)}
        </div>
        <div>
           
        <div className="col-12 col-lg-12 mb-4">   
          <h4>Total Claims 2022</h4> 
          <Line data={data2} options={options} />
          </div>
     </div>
     </div>

    )

}

export default LineGraph
