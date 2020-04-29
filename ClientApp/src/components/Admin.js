import React, {Component} from 'react';
import  {Button, Form, Label, Input, Modal, ModalBody} from 'react-bootstrap';
import SimpleReactFileUpload from './react-file-upload.js';
import './Admin.css'

export class Admin extends Component {
	constructor(props){
		super(props);
		this.state={
			showImportUser:false,
			showImportCalendar:false,
			showAddUser:false,
			showRemoveUser:false,
			studentId:false,
			studentName:false,
			teamName:false,
			graduationDate:false
		}
		this.handleStudentIdChange=this.handleStudentIdChange.bind(this);
		this.handleStudentNameChange=this.handleStudentNameChange.bind(this);
		this.handleTeamNameChange=this.handleTeamNameChange.bind(this);
		this.handleGraduationDateChange=this.handleGraduationDateChange.bind(this);
		this.setShowAddUser=this.setShowAddUser.bind(this);
		this.setShowRemoveUser=this.setShowRemoveUser.bind(this);
		this.unsetShowAddUser=this.unsetShowAddUser.bind(this);
		this.unsetShowRemoveUser=this.unsetShowRemoveUser.bind(this);
		this.setShowImportUser=this.setShowImportUser.bind(this);
		this.setShowImportCalendar=this.setShowImportCalendar.bind(this);
		this.unsetShowImportUser=this.unsetShowImportUser.bind(this);
		this.unsetShowImportCalendar=this.unsetShowImportCalendar.bind(this);
		this.handleCreateUser=this.handleCreateUser.bind(this);
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
	handleStudentIdChange(e){this.setState({studentId:e.target.value});}
	handleStudentNameChange(e){this.setState({studentName:e.target.value});}
	handleTeamNameChange(e){this.setState({teamName:e.target.value});}
	handleGraduationDateChange(e){this.setState({graduationDate:e.target.value});}
	handleCreateUser(){
		this.httpPostAsync('/api/Students',{
			StudentId:this.state.studentId,
			Name:this.state.studentName,
			Graduation:this.state.graduationDate,
			Team:this.state.teamName
		})
	}
    httpPostAsync(url, data)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", url, true);
        xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xmlHttp.send(data);
    }
	setShowAddUser(){this.setState({showAddUser:true})};
	setShowRemoveUser(){this.setState({showRemoveUser:true})};
	unsetShowAddUser(){this.setState({showAddUser:false})};
	unsetShowRemoveUser(){this.setState({showRemoveUser:false})};
	setShowImportUser(){this.setState({showImportUser:true})};
	setShowImportCalendar(){this.setState({showImportCalendar:true})};
	unsetShowImportUser(){this.setState({showImportUser:false})};
	unsetShowImportCalendar(){this.setState({showImportCalendar:false})};
	render () {
		return (
		<div className="Admin">

				<div class="row">
					<div class="column">
						<h2>Admin</h2>
						<Button variant="danger" onClick={this.setShowImportUser}>Import Users</Button>
						<Button variant="danger" onClick={this.setShowImportCalendar}>Import Calendar</Button>
						<Button variant="danger" href="/api/file/Users">Export Users</Button>
						<Button variant="danger" href="/api/file/Calendar">Export Calendar</Button>
											</div>
				</div>
<Modal show={this.state.showImportUser} onHide={this.unsetShowImportUser}>
	<Modal.Header closeButton>
		<Modal.Title>Import User</Modal.Title>
	</Modal.Header>
	<Modal.Body>
		<SimpleReactFileUpload url={'api/file/users'} />
	</Modal.Body>
</Modal>
<Modal show={this.state.showAddUser} onHide={this.unsetShowAddUser}>
	<Modal.Header closeButton>
		<Modal.Title>Add User</Modal.Title>
	</Modal.Header>
	<Modal.Body>
		<form>
			<input type="text" name="StudentId" placeholder="Student Id" value={this.state.studentId} onChange={this.handleStudentIdChange} />
			<input type="text" name="StudentName" placeholder="Student Name" value={this.state.studentName} onchange={this.handleStudentNameChange}/>
			<input type="text" name="TeamName" placeholder="Team Name" value={this.state.teamName} onchange={this.handleTeamNameChange}/>
			<input type="date" name="GraduationDate" value={this.state.graduationDate} onchange={this.handleGraduationDateChange}/>
			<Button onClick={this.handleCreateUser}/>
		</form>
	</Modal.Body>
</Modal>
<Modal show={this.state.showImportCalendar} onHide={this.unsetShowImportCalendar}>
	<Modal.Header closeButton>
		<Modal.Title>Import Calendar</Modal.Title>
	</Modal.Header>
	<Modal.Body>
		
	<SimpleReactFileUpload url={'api/file/calendar/'} />
	</Modal.Body>
</Modal>
				<div class="row">
					<h2>Users</h2>
					<div>
						<input type="button" value="Add" />
						<input type="button" value="Remove" />
					</div>
					<table>
						<thead>
							<tr><th></th><th>Name</th><th>Id</th><th>Team</th><th>Graduation</th><th>Last Chrck in</th></tr>
						</thead>
						<tbody>
							<tr><td><input type="button" value="user" /></td><td>Tim </td>  <td>123456</td><td>Rover</td><td>1919</td><td>01/10/2020</td></tr>
							<tr><td><input type="button" value="user" /></td><td>Bob </td>  <td>789101</td><td>SRC</td><td>2020</td><td>01/01/1918</td></tr>
							<tr><td><input type="button" value="user" /></td><td>Landes</td><td>121314</td><td>Rovket</td><td>2025</td><td>03/05/2005</td></tr>
						</tbody>
					</table>
				</div>
				<div class="footer">
					<p>Footer</p>
				</div> 
		</div>
	);}
}
