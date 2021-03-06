import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import ApiCalendar from 'react-google-calendar-api';
import moment from 'moment';


import './main.css'

export default class DemoApp extends React.Component {

    calendarComponentRef = React.createRef();
    state = {
        calendarWeekends: true,
        calendarEvents: [ // initial event data
            { title: 'Event Now', start: new Date() }
        ]
    };

    componentDidMount() {
        console.log('componentDidMount')
    }

    handleItemClick = (event, name) => {
        if (name === 'sign-in') {
            try {
                ApiCalendar.handleAuthClick();
            } catch (error) {
                console.log("error", error, error.message);
            }
        } else if (name === 'sign-out') {
            ApiCalendar.handleSignoutClick();
        }
    };

    addEvent = () => {

        var tomorrow = new Date();


        const eventFromNow = {
            summary: "Tattoo san",
            Description: 'Tattoo Description1',
            CalendarId: 'CalendarId Description1',
            start: {
                dateTime: moment().format(),
                // dateTime: new Date(),
                // "timeZone": 'India Standard Time'
            },
            end: {
                dateTime: moment().add(1, 'hours').format(),
                // dateTime: new Date(tomorrow.setDate(tomorrow.getDate() + 1))
                // "timeZone": 'India Standard Time'
            },
            time: 60,
        };

        console.log("==ApiCalendar==>", eventFromNow);
        ApiCalendar.createEvent(eventFromNow)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });

        // ApiCalendar.createEventFromNow(eventFromNow)
        //     .then((result) => {
        //         console.log(result);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        // ApiCalendar.listUpcomingEvents(10)
        //     .then(({result}) => {
        //         console.log(result.items);
        //     });
    };

    render() {
        return (
            <div className='demo-app'>
                <div className='demo-app-top'>
                    <button
                        onClick={(e) => this.handleItemClick(e, 'sign-in')}
                    >
                        sign-in
                    </button>
                    <button
                        onClick={(e) => this.handleItemClick(e, 'sign-out')}
                    >
                        sign-out
                    </button>


                    <button onClick={this.addEvent}> add event  </button>



                    <button onClick={ this.toggleWeekends }>toggle weekends</button>&nbsp;
                    <button onClick={ this.gotoPast }>go to a date in the past</button>&nbsp;
                    (also, click a date/time to add an event)
                </div>
                <div className='demo-app-calendar'>
                    <FullCalendar
                        defaultView="dayGridMonth"
                        header={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                        }}
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                            googleCalendarPlugin
                        ]}
                        googleCalendarApiKey='AIzaSyCHH5QYUxkVFShUCMkXDoMRKK6MP6l_Thg'
                        ref={ this.calendarComponentRef }
                        weekends={ this.state.calendarWeekends }
                        events={
                            this.state.calendarEvents
                            //     {
                            //
                            //     googleCalendarId: 'f7onfvfcrdulkigsgn6mrq6fi0@group.calendar.google.com', ...
                            //
                            // }
                        }

                        dateClick={ this.handleDateClick }
                    />
                </div>
            </div>
        )
    }

    toggleWeekends = () => {
        this.setState({ // update a property
            calendarWeekends: !this.state.calendarWeekends
        })
    };

    gotoPast = () => {
        let calendarApi = this.calendarComponentRef.current.getApi()
        calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
    };

    handleDateClick = (arg) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
            this.setState({  // add new event data
                calendarEvents: this.state.calendarEvents.concat({ // creates a new array
                    title: 'New Event',
                    start: arg.date,
                    allDay: arg.allDay
                })
            })
        }
    }

}