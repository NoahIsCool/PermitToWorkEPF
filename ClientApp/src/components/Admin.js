import React, {Component} from 'react';
import  {Button, Form, Label, Input, Modal, ModalBody} from 'react-bootstrap';
import SimpleReactFileUpload from './react-file-upload.js';

export class Admin extends Component {
	constructor(props){
		super(props);
		this.state={
			showImportUser:false,
			showExportUser:false,
			showImportCalendar:false,
			showExportCalendar:false
		}
		this.setShowImportUser=this.setShowImportUser.bind(this);
		this.setShowExportUser=this.setShowExportUser.bind(this);
		this.setShowImportCalendar=this.setShowImportCalendar.bind(this);
		this.setShowExportCalendar=this.setShowExportCalendar.bind(this);
		this.unsetShowImportUser=this.unsetShowImportUser.bind(this);
		this.unsetShowExportUser=this.unsetShowExportUser.bind(this);
		this.unsetShowImportCalendar=this.unsetShowImportCalendar.bind(this);
		this.unsetShowExportCalendar=this.unsetShowExportCalendar.bind(this);
	}
	setShowImportUser(){this.setState({showImportUser:true})};
	setShowExportUser(){this.setState({showExportUser:true})};
	setShowImportCalendar(){this.setState({showImportCalendar:true})};
	setShowExportCalendar(){this.setState({showExportCalendar:true})};
	unsetShowImportUser(){this.setState({showImportUser:false})};
	unsetShowExportUser(){this.setState({showExportUser:false})};
	unsetShowImportCalendar(){this.setState({showImportCalendar:false})};
	unsetShowExportCalendar(){this.setState({showExportCalendar:false})};
	render () {
		return (
		<div className="Admin">

				<div class="row">
					<div class="column">
						<h2>Admin</h2>
						<button variant="primary" onClick={this.setShowImportUser}>Import Users</button>
						<button variant="primary" onClick={this.setShowExportUser}>Export Users</button>
						<button variant="primary" onClick={this.setShowImportCalendar}>Import Calendar</button>
						<button variant="primary" onClick={this.setShowExportCalendar}>Export Calendar</button>
					</div>
				</div>
<Modal show={this.state.showImportUser} onHide={this.unsetShowImportUser}>
	<Modal.Header closeButton>
		<Modal.Title>Import User</Modal.Title>
	</Modal.Header>
	<Modal.Body>
		<SimpleReactFileUpload />
	</Modal.Body>
</Modal>
<Modal show={this.state.showExportUser} onHide={this.unsetShowExportUser}>
	<Modal.Header closeButton>
		<Modal.Title>Export User</Modal.Title>
	</Modal.Header>
	<Modal.Body>
		
	<SimpleReactFileUpload />
	</Modal.Body>
</Modal>
<Modal show={this.state.showImportCalendar} onHide={this.unsetShowImportCalendar}>
	<Modal.Header closeButton>
		<Modal.Title>Import Calendar</Modal.Title>
	</Modal.Header>
	<Modal.Body>
		
	<SimpleReactFileUpload />
	</Modal.Body>
</Modal>
<Modal show={this.state.showExportCalendar} onHide={this.unsetShowExportCalendar}>
	<Modal.Header closeButton>
		<Modal.Title>Export Calendar</Modal.Title>
	</Modal.Header>
	<Modal.Body>
		
	<SimpleReactFileUpload />
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
