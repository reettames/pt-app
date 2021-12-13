import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import { BarChart, XAxis, YAxis, Bar, Tooltip} from 'recharts';


export default function Statistics() {

    const [trainings, setTrainings] = useState([]);

    const fetchTrains = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => {

                let tData = [];

                data.map(training => {
                    const minutes = { name: training.activity, duration: training.duration };
                    tData.push(minutes);
                })

                let results = _(data)
                    .groupBy("activity")
                    .map((name, id) => ({
                        name: id,
                        duration: _.sumBy(name, 'duration'),
                    }))
                    .value()
                setTrainings(results);
            })
            .catch(error => console.error(error))
    }

    useEffect(() => {
        fetchTrains();
    }, []);
    return(
            <div>
                <h2 style={{marginLeft: '40%'}}>Training statistics</h2>
                <BarChart style={{ marginTop: '20px' }} width={1200} height={600} data={trainings}>
                    <XAxis dataKey="name" />
                    <YAxis dataKey="duration" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="duration" fill="#ad8bc9" />
                </BarChart>
                <p style={{marginLeft: '20px'}}>Minutes</p>
            </div>
    )
}