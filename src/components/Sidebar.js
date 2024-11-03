// src/components/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <List>
      <ListItem button component={Link} to="/dashboard">
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/chatbot">
        <ListItemText primary="Chatbot" />
      </ListItem>
      <ListItem button component={Link} to="/reports">
        <ListItemText primary="Reports" />
      </ListItem>
    </List>
  );
};

export default Sidebar;
