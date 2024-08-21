// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../css/Singers.css';

// const Users = () => {
//   const URL = 'http://localhost:8080';
//   const [users, setUsers] = useState([]);
//   const [editUser, setEditUser] = useState(null);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const navigate = useNavigate();

//   const allUsers = () => {
//     axios.get(`${URL}/users`)
//       .then(response => {
//         setUsers(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching users:', error);
//       });
//   };

//   useEffect(() => {
//     allUsers();
//   }, []);

//   const handleEdit = (user) => {
//     setEditUser(user);
//     setShowSuccess(false);
//     if (!document.getElementById('editPopup')) {
//       createEditPopup(user);
//     } else {
//       document.getElementById('editPopup').style.display = 'block';
//     }
//   };

//   const createEditPopup = (user) => {
//     const editPopupHTML =
//       `<div id="editPopup" class="popup">
//         <div class="popup-content">
//           <span class="close-btn" id="closeEditPopup">&times;</span>
//           <h2>Edit User</h2>
//           <div class="input-group">
//             <label for="editUserName">User Name</label>
//             <input type="text" id="editUserName" class="input-field" value="${user.userName}">
//           </div>
//           <div class="input-group">
//             <label for="editEmail">Email</label>
//             <input type="email" id="editEmail" class="input-field" value="${user.email}">
//           </div>
//           <button id="saveChanges" class="btn">Save Changes</button>
//         </div>
//       </div>`;

//     document.body.insertAdjacentHTML('beforeend', editPopupHTML);

//     document.getElementById('closeEditPopup').onclick = () => {
//       document.getElementById('editPopup').style.display = 'none';
//     };

//     window.onclick = (event) => {
//       if (event.target === document.getElementById('editPopup')) {
//         document.getElementById('editPopup').style.display = 'none';
//       }
//     };

//     document.getElementById('saveChanges').onclick = () => {
//       const userName = document.getElementById('editUserName').value;
//       const email = document.getElementById('editEmail').value;

//       handleEditSave(user, { userName, email });
//     };
//   };

//   const handleEditSave = (user, updatedDetails) => {
//     if (updatedDetails.userName && updatedDetails.email) {
//       axios.put(`${URL}/users/${user.userId}`, updatedDetails)
//         .then(() => {
//           allUsers();
//           setShowSuccess(true);
//           setTimeout(() => {
//             document.getElementById('editPopup').style.display = 'none';
//           }, 2000);
//         })
//         .catch(error => {
//           console.error('Error updating user:', error);
//         });
//     }
//   };

//   const handleDelete = (userId) => {
//     axios.delete(`${URL}/users/${userId}`)
//       .then(() => {
//         allUsers();
//       })
//       .catch(error => {
//         console.error('Error deleting user:', error);
//       });
//   };

//   return (
//     <div className="users-container">
//       <h1>Users</h1>
//       <button onClick={() => navigate('/addNewUser')}>Add New User</button>
//       <div className="users-list">
//         {users.map((user) => {
//           return (
//             <div key={user.userId} className="user-card">
//               <h2>{user.userName}</h2>
//               <p>Email: {user.email}</p>
//               <div className="user-actions">
//                 <button onClick={() => handleEdit(user)}>Edit</button>
//                 <button onClick={() => handleDelete(user.userId)}>Delete</button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {editUser && (
//         <div id="editPopup" className="popup" style={{ display: 'block' }}>
//           <div className="popup-content">
//             <span className="close-btn" id="closeEditPopup" onClick={() => document.getElementById('editPopup').style.display = 'none'}>&times;</span>
//             {showSuccess ? (
//               <div className="success-message">
//                 <span>&#128522;</span>
//                 <p>User details updated successfully!</p>
//               </div>
//             ) : (
//               <>
//                 <h2>Edit User</h2>
//                 <div className="input-group">
//                   <label htmlFor="editUserName">User Name</label>
//                   <input type="text" id="editUserName" className="input-field" defaultValue={editUser.userName} />
//                 </div>
//                 <div className="input-group">
//                   <label htmlFor="editEmail">Email</label>
//                   <input type="email" id="editEmail" className="input-field" defaultValue={editUser.email} />
//                 </div>
//                 <button id="saveChanges" className="btn" onClick={() => handleEditSave(editUser, { userName: document.getElementById('editUserName').value, email: document.getElementById('editEmail').value })}>Save Changes</button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Users;


/////////////////////////////////////////////2
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Singers.css';
import Swal from 'sweetalert2';

const Users = () => {
  const URL = 'http://localhost:8080';
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const allUsers = () => {
    axios.get(`${URL}/users`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  useEffect(() => {
    allUsers();
  }, []);

  const handleEdit = (user) => {
    setEditUser(user);
    setShowSuccess(false);
    if (!document.getElementById('editPopup')) {
      createEditPopup(user);
    } else {
      document.getElementById('editPopup').style.display = 'block';
    }
  };

  const createEditPopup = (user) => {
    const editPopupHTML =
      `<div id="editPopup" class="popup">
        <div class="popup-content">
          <span class="close-btn" id="closeEditPopup">&times;</span>
          <h2>Edit User</h2>
          <div class="input-group">
            <label for="editUserName">User Name</label>
            <input type="text" id="editUserName" class="input-field" value="${user.userName}">
          </div>
          <div class="input-group">
            <label for="editEmail">Email</label>
            <input type="email" id="editEmail" class="input-field" value="${user.email}">
          </div>
          <button id="saveChanges" class="btn">Save Changes</button>
        </div>
      </div>`;

    document.body.insertAdjacentHTML('beforeend', editPopupHTML);

    document.getElementById('closeEditPopup').onclick = () => {
      document.getElementById('editPopup').style.display = 'none';
    };

    window.onclick = (event) => {
      if (event.target === document.getElementById('editPopup')) {
        document.getElementById('editPopup').style.display = 'none';
      }
    };

    document.getElementById('saveChanges').onclick = () => {
      const userName = document.getElementById('editUserName').value;
      const email = document.getElementById('editEmail').value;

      handleEditSave(user, { userName, email });
    };
  };

  const handleEditSave = (user, updatedDetails) => {
    if (updatedDetails.userName && updatedDetails.email) {
      axios.put(`${URL}/users/${user.userId}`, updatedDetails)
        .then(() => {
          allUsers();
          setShowSuccess(true);
          setTimeout(() => {
            document.getElementById('editPopup').style.display = 'none';
          }, 2000);
        })
        .catch(error => {
          console.error('Error updating user:', error);
        });
    }
  };

  const handleDelete = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${URL}/users/${userId}`)
          .then(() => {
            Swal.fire(
              'Deleted!',
              'Your user has been deleted.',
              'success'
            );
            allUsers();
          })
          .catch(error => {
            console.error('Error deleting user:', error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your user is safe :)',
          'error'
        );
      }
    });
  };

  const handleAddUser = () => {
    navigate('/addNewUser');///ככה עושים??
  };

  return (
    <div className="users-container">
      <h1>Users</h1>
      <button onClick={handleAddUser}>Add New User</button>
      <div className="users-list">
        {users.map((user) => {
          return (
            <div key={user.userId} className="user-card">
              <h2>{user.userName}</h2>
              <p>Email: {user.email}</p>
              <div className="user-actions">
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.userId)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>

      {editUser && (
        <div id="editPopup" className="popup" style={{ display: 'block' }}>
          <div className="popup-content">
            <span className="close-btn" id="closeEditPopup" onClick={() => document.getElementById('editPopup').style.display = 'none'}>&times;</span>
            {showSuccess ? (
              <div className="success-message">
                <span>&#128522;</span>
                <p>User details updated successfully!</p>
              </div>
            ) : (
              <>
                <h2>Edit User</h2>
                <div className="input-group">
                  <label htmlFor="editUserName">User Name</label>
                  <input type="text" id="editUserName" className="input-field" defaultValue={editUser.userName} />
                </div>
                <div className="input-group">
                  <label htmlFor="editEmail">Email</label>
                  <input type="email" id="editEmail" className="input-field" defaultValue={editUser.email} />
                </div>
                <button id="saveChanges" className="btn" onClick={() => handleEditSave(editUser, { userName: document.getElementById('editUserName').value, email: document.getElementById('editEmail').value })}>Save Changes</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};



export default Users;
