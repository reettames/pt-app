import React, { useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import dayjs from 'dayjs';

export default function Calendar() {
    const [trainings, setTrainings] = useState([]);

    const fetchTrainings = () => {
            fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(async response => {
                const data = await response.json();
                const array = [];

                data.forEach(trainings => {
                    const name = trainings.activity + " " + trainings.duration + " min - " + trainings.customer.firstname + " " + trainings.customer.lastname;
            
                    const date = new Date(trainings.date);
                    dayjs(date).format('MM/DD/YYYY HH:mm');
                    console.log(date);
            
                    const event = {title: name, date: date};
                    array.push(event);
                    })
                setTrainings(array);

            })
        }

    useEffect(() =>{
        fetchTrainings();
    });

    return(
        <div>
            <FullCalendar
            plugins={[ dayGridPlugin ]}
            events={trainings}
            headerToolbar={{
                left: "dayGridDay,dayGridWeek,dayGridMonth",
                center: "title",
                right: "today,prev,next"
            }}
          />
        </div>
    )

}