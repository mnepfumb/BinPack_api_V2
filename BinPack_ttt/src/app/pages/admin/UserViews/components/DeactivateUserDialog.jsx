import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import React from 'react';
import { Icon } from '@mui/material';
import axios from 'app/api/axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  	return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeactivateUserDialog({ user }) {
	const [open, setOpen] = React.useState(false);

	function handleClickOpen() {
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
	}


	const handleDeactivate = async (event) => {
    //console.log(" user._id: " + user._id);
		try {
			const accessToken = window.localStorage.getItem('accessToken')
      		var url = '/users/' + user._id;
			//console.log("url: " + url);
			
			const response = await axios.patch(url, { 
				is_active: false,
				updated_at: new Date(),
				headers: { 
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}` 
				},
				// withCredentials: true
			})
			const { status } = response.data;
			if (status === 'success') {
        setOpen(false);
			}
		} catch (error) {
			//console.log("error: " + error);
		}
	};

	return (
		<div>
			<Icon style={{ color: '#FF3D57' }} onClick={handleClickOpen}>do_not_disturb_on</Icon>
			<Dialog
				open={open}
				keepMounted
				onClose={handleClose}
				TransitionComponent={Transition}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">User Deactivation</DialogTitle>

				<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">
					The current user will be deactivated. They will not be able to gain access to the
					system.
				</DialogContentText>
				</DialogContent>

				<DialogActions>
				<Button onClick={handleClose} color="primary">
					Back
				</Button>

				<Button onClick={handleDeactivate} color="primary">
					Deactivate
				</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
