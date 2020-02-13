import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { gapi } from 'gapi-script'



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
        console.log('asdasdasdasdasdadasdsa')
        this.loadGapi()
    }

    loadGapi = () => {
        console.log("loadGapi");
        const API_KEY = 'AIzaSyCHH5QYUxkVFShUCMkXDoMRKK6MP6l_Thg';

        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/client.js";

        console.log("scriptscript", script);
        script.onload = () => {
            console.log('asdasdasd',gapi)
            gapi.client.init({
                'apiKey': API_KEY,
                // Your API key will be automatically added to the Discovery Document URLs.
                'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
                // clientId and scope are optional if auth is not required.
                'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
                'scope': 'profile',
            }).then(function() {
                // 3. Initialize and make the API request.
                return gapi.client.people.people.get({
                    'resourceName': 'people/me',
                    'requestMask.includeField': 'person.names'
                });
            }).then(function(response) {
                console.log(response.result);
            }, function(reason) {
                console.log('Error: ' + reason.result.error.message);
            });
        }




    }

    render() {
        return (
            <div className='demo-app'>
                <div className='demo-app-top'>
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