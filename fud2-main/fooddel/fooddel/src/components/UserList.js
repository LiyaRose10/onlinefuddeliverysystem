// frontend/src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('❌ Error fetching users:', error));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
