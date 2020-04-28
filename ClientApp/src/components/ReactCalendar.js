import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Modal from 'react-modal';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export class ReactCalendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [
                {}
            ],
            isModOpen: false,
            machine: 'Lathe 1',
            studentId: '',
            startTime: null,
            endTime: null,
            idNums: []
        }

        // Load events from DB
        this.configEventTextFromHTTPGET = this.configEventTextFromHTTPGET.bind(this);
        this.httpGetAsync('/api/SignIn', this.configEventTextFromHTTPGET);
        this.getStudentIdsFromHTTPGET = this.getStudentIdsFromHTTPGET.bind(this);
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

    httpPostAsync(url, data)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", url, true);
        xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xmlHttp.send(data);
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

    getStudentIdsFromHTTPGET(text)
    {
        var studentsFromDb = JSON.parse(text);
        window.alert("Inside Student Ids");

        // Loop through students and return id list
        var idNums = [];
        studentsFromDb.forEach(addIdNum);
        function addIdNum(student)
        {
            idNums.push(student.studentId);
        }

        this.setState({
            idNums: idNums,
        })
    }

    getTeamNameFromIdHTTPGET(text, id)
    {
        var studentsFromDb = JSON.parse(text);

        // Loop through students and return team with matching ID
        studentsFromDb.forEach(checkForIdMatch);
        function checkForIdMatch(student)
        {
            if (id == student.studentId)
                return student.team;
        }

        // Shouldn't get here
        return null;
    }

    handleSelect = ({ start, end }) => {
        // const title = window.prompt('New Event name')
        // if (title)
        //     this.setState({
        //           events: [
        //               ...this.state.events,
        //               {
        //                   start,
        //                   end,
        //                   title,
        //               },
        //           ],
        //       })

        const isOpen = this.state.isModOpen;
        this.setState(
            {
                isModOpen: !isOpen,
                startTime: start,
                endTime: end
            });
    }

    toggleModal = event => {
        const isOpen = this.state.isModOpen;
        this.setState({ isModOpen: !isOpen });

        // Not storing ID numbers on front end
        if (!this.state.isModOpen)
            this.setState({studentId: ''});
    }

    addReservation = event => {
        // Validate ID number

        // Empty?
        if (this.state.studentId == '')
        {
            window.alert("Student ID must be provided!");
            return;
        }

        // Allowed to access machines?
        var valid = false;
        this.httpGetAsync('/api/TodoItems', this.getStudentIdsFromHTTPGET);
        window.alert(this.state.idNums);
        validIds.forEach(checkIdNumber);
        function checkIdNumber(validId)
        {
            if (this.state.studentId == validId)
                valid = true;
        }
        // Not storing student IDs on front end
        validIds = null;

        // Don't add reservation if non-valid id given
        if (!valid)
        {
            // Not storing student IDs on front end
            this.setState({studentId: ''});
            window.alert("Unauthorized/Invalid student ID");
            return;
        }

        // Add reservation to calendar
        const teamName = this.httpGetAsync('api/TodoItems',
            this.getTeamNameFromIdHTTPGET(this.state.studentId));
        const calendarEvent =
            {
                start: this.state.startTime,
                end: this.state.endTime,
                title: this.state.machine,
                desc: teamName
            };
        this.setState(
            {
                events: [
                    ...this.state.events,
                    calendarEvent
                ],
                studentId: ''
            })
    }

    testAdd = event =>
    {
        var signIn =
            {
                "StudentId": 111111111,
                "MachineName": "Mill 1",
                "Student":
                    {
                        "StudentId": 111111111,
                        "Name": "Bob Man",
                        "Team": "Dragons",
                        "Graduation": "2020-05-01 00:00:00 AM",
                    },
                "Machine":
                    {
                        "Name": "Mill 1",
                        "Notes": "This is a mill",
                    },
                "StartTime": "2020-04-30 07:00:00 PM",
                "EndTime": "2020-04-30 09:00:00 PM",
            };

        //const signInText = JSON.stringify(signIn);
        this.httpPostAsync('/api/SignIn', signIn);
    }

    handleEquipChange = event => {
        this.setState({machine: event.target.value});
    }

    handleIdChange = event => {
        this.setState({studentId: event.target.value});
    }

    render () {
        return (
            <div>
                <Calendar
                    selectable
                    defaultDate={new Date()}
                    defaultView='week'
                    events={this.state.events}
                    localizer={localizer}
                    onSelectEvent={event => alert(event.desc)}
                    onSelectSlot={this.handleSelect}
                    style={{ height: '100vh' }}
                />
                <Modal
                    isOpen={this.state.isModOpen}
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={this.toggleModal}
                    aria={{
                        labelledby: "heading",
                        describedby: "fulldescription"
                    }}>
                    <h1 id="heading">Machine Reservation</h1>
                    <div id="fulldescription" tabIndex="0" role="document">
                        <form onSubmit={this.testAdd}>
                            <select value={this.state.machine} onChange={this.handleEquipChange}>
                                <option value="Lathe 1">Lathe 1</option>
                                <option value="Lathe 2">Lathe 2</option>
                                <option value="Mill 1">Mill 1</option>
                                <option value="Mill 2">Mill 2</option>
                                <option value="CNC Plasma">CNC Plasma</option>
                                <option value="Welders">Welders</option>
                            </select>
                            <p>Student ID number</p>
                            <input type="text" onChange={this.handleIdChange}  />
                            <button key="submit" htmlType="submit">Submit</button>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}
