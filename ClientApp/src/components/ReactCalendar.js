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

    onEventResize = ({ event, start, end }) => {
        const { events } = this.state

        const nextEvents = events.map(existingEvent => {
            return existingEvent.id == event.id
                ? { ...existingEvent, start, end }
                : existingEvent
        })

        this.setState({
            events: nextEvents,
        })
    }

    onEventDrop = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
        const { events } = this.state

        const idx = events.indexOf(event)
        let allDay = event.allDay

        if (!event.allDay && droppedOnAllDaySlot) {
            allDay = true
        } else if (event.allDay && !droppedOnAllDaySlot) {
            allDay = false
        }

        const updatedEvent = { ...event, start, end, allDay }

        const nextEvents = [...events]
        nextEvents.splice(idx, 1, updatedEvent)

        this.setState({
            events: nextEvents,
        })
    }

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
