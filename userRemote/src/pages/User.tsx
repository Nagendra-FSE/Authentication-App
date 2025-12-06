import React from 'react';
import type { UserType } from '../types/userType.types.ts';

type Props = {
    user: UserType
}

const User: React.FC<Props> = ({user}) => {
  // prefer id from props; else try react-router param

  if (!user) {
    return <div style={{ padding: 20 }}>User not found</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>User Detail</h2>
      <p style={{ color: "#fff" }}>
        <strong >Email:</strong> {user?.email}
      </p>
      <p style={{ color: "#fff" }}>
        <strong>Verified:</strong> {user?.verified ? "Verified" : "Email Not verified"}
       
      </p>
      <p style={{ color: "#fff" }}>
         {user?.verified == false && "Please verify your email via link; please check your email"}
      </p>
    </div>
  );
};

export default User;