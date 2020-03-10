import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(Calendar);

export class ReactCalendar extends Component {
    state = {
        events: [
            {
                start: new Date(),
                end: new Date(moment().add(1, "days")),
                title: "Some title"
            }
        ]
    };

    onEventResize = (type, { event, start, end, allDay }) => {
        this.setState(state => {
            state.events[0].start = start;
            state.events[0].end = end;
            return { events: state.events };
        });
    };

    onEventDrop = ({ event, start, end, allDay }) => {
        console.log(start);
    };

    render () {
        return (
            <div>
                <DnDCalendar
                    defaultDate={new Date()}
                    defaultView="month"
                    events={this.state.events}
                    localizer={localizer}
                    onEventDrop={this.onEventDrop}
                    onEventResize={this.onEventResize}
                    resizable
                    style={{ height: "100vh" }}
                />
            </div>
        );
    }
}
