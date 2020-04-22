import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import Dialog from 'react-dialog';
import { DropdownButton, Dropdown } from 'react-bootstrap';

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-dialog/css/index.css';

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(Calendar);

export class ReactCalendar extends React.Component {
    constructor(props) {
        super(props)
        // var eventsFromStorage = localStorage.getItem('events')

        this.state = {
            events: [{}]
            // isDialogOpen: false,
            // start: null,
            // end: null
            // events: JSON.parse(eventsFromStorage) ?
            //     JSON.parse(eventsFromStorage) : [{}]

            //events: localStorage.getItem('events') ? localStorage.getItem('events') : [{}]
            // events: [
            //     {
            //         start: new Date(),
            //         end: new Date(moment().add(1, "days")),
            //         title: "Some title"
            //     }
            // ]
        }
    }

    onEventResize = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
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
        // this.storeChanges()
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
        // this.storeChanges()
    }

    handleSelect = ({start, end}) => {
        // this.setState({
        //     isDialogOpen: true,
        //     start: start,
        //     end: end
        // })

        // const dialog = <Dialog
        //     title="Choose Equipment"
        //     modal
        //     buttons={[{
        //         text: 'Close'
        //     }]}
        // >
        //     <h1>Dialog Content</h1>
        //     <p>More Content. Anything goes here</p>
        // </Dialog>

        const title = window.prompt('Choose Equipment')
        if (title) {
            this.setState({
                events: [
                    ...this.state.events,
                    {
                        start,
                        end,
                        title,
                    },
                ],
            })
            // this.storeChanges()
        }
    }

    handleClose = () => {
        this.setState({
            isDialogOpen: false
        })
    }

    storeChanges(){
        var eventsString = JSON.stringify(this.state.events)
        localStorage.setItem('events', eventsString)
    }

    render () {
        return (
            <div>
                <DnDCalendar
                    selectable
                    resizable
                    defaultDate={new Date()}
                    defaultView="month"
                    events={this.state.events}
                    localizer={localizer}
                    onEventDrop={this.onEventDrop}
                    onEventResize={this.onEventResize}
                    onSelectSlot={this.handleSelect}
                    onSelectEvent={event => alert(event.title)}
                    style={{ height: "100vh" }}
                />
                {/*{this.state.isDialogOpen &&*/}
                {/*<Dialog*/}
                    {/*title="Choose Equipment"*/}
                    {/*modal*/}
                    {/*onClose={this.handleClose}*/}
                {/*>*/}
                    {/*<DropdownButton id="dropdown-basic-button" title="Dropdown button">*/}
                        {/*<Dropdown.Item href="#/action-1">Action</Dropdown.Item>*/}
                        {/*<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>*/}
                        {/*<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>*/}
                    {/*</DropdownButton>*/}
                {/*</Dialog>*/}
                {/*}*/}
            </div>
        );
    }
}
