import React, { Component } from 'react';
import './CheckIn.css';

export class CheckIn extends Component{
	render() {
		return (

			<div className="CheckIn">
				<div class="row">
					<div class="column" style={{textAlign: 'right'}}>
						<p style={{paddingRight: '10px', paddingTop:'4%'}}>
							Machines
						</p>
					</div>
					<div class="column">
						<div style={{paddingTop: '4%'}}>
							<div>
								<form>
									Student ID:
									<input type="text" name="student ID" /> <br />
									<div class="ckbox"style={{border: 'solid'}}>
										<input type="checkbox" name="lathe 1" /> Lathe 1 <br />
										<input type="checkbox" name="lathe 2" /> Lathe 2<br />
										<input type="checkbox" name="mill 1" /> Mill 1<br />
										<input type="checkbox" name="mill 2" /> Mill 2<br />
										<input type="checkbox" name="cnc plasma" disabled /> <s>CNC Plasma</s> (Checked Out: Tommy Mai 1/15/2020 2:00pm) <br />
										<input type="checkbox" name="welder" /> Welders<br />
									</div>
									<input type="button" name="checkIn" value="Check In" />
									<input type="button" name="checkOut" value="Check Out" />
								</form>
							</div>
						</div>
					</div>
				</div></div>

		);
	} 
}
