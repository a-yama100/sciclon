// E:\programming\Project\sciclon\pages\users\register.tsx

import React, { useState } from 'react';

function UserRegister() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    membership_type_id: '',
    membership_duration: '',
    question_mode: '',
    question_count: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Error registering user.');
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="membership_type_id" placeholder="Membership Type" onChange={handleChange} />
        <input type="text" name="membership_duration" placeholder="Membership Duration" onChange={handleChange} />
        <input type="text" name="question_mode" placeholder="Question Mode" onChange={handleChange} />
        <input type="number" name="question_count" placeholder="Question Count" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default UserRegister;
