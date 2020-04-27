import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)

export class ReactCalendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [
                {}
            ]
        }
        this.configEventTextFromHTTPGET = this.configEventTextFromHTTPGET.bind(this);
        this.httpGetAsync('/api/SignIn', this.configEventTextFromHTTPGET);
    }

    httpGetAsync(url, callback)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", url, true); // true for asynchronous
        xmlHttp.send(null);
    }

    configEventTextFromHTTPGET(text)
    {
        var eventsFromDb = JSON.parse(text);

        // Loop through events and build events for calendar
        var eventsForCalendar = [];
        eventsFromDb.forEach(buildCalendarEvent);

        function buildCalendarEvent(event)
        {
            var calendarEvent =
                {
                    start: new Date(event.startTime),
                    end: new Date(event.endTime),
                    title: event.machine.name,
                    desc: event.student.team
                };
            eventsForCalendar.push(calendarEvent);
        }

        this.setState({
            events: eventsForCalendar,
        })
    }

    render () {
        return (
            <div>
                <Calendar
                    defaultDate={new Date()}
                    defaultView='week'
                    events={this.state.events}
                    localizer={localizer}
                    onSelectEvent={event => alert(event.desc)}
                    style={{ height: '100vh' }}
                />
            </div>
        );
    }
}
