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
                {
                    start: new Date(),
                    end: new Date(moment().add(1, 'days')),
                    title: 'Some title'
                }
            ]
        }
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
        window.alert(text);
    }

    render () {
        this.httpGetAsync('/api/SignIn', this.configEventTextFromHTTPGET);
        return (
            <div>
                <Calendar
                    defaultDate={new Date()}
                    defaultView='week'
                    events={this.state.events}
                    localizer={localizer}
                    onSelectEvent={event => alert(event.title)}
                    style={{ height: '100vh' }}
                />
            </div>
        );
    }
}
