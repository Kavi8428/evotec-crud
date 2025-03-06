import { FetchUsers } from '@/lib/actions/user'
import React from 'react'
import UserTable from './user-table';

export async function UserData() {

    const users = await FetchUsers();
    // console.log('users',users);

  return (
    <div>
      <UserTable users={users} />
    </div>
  )
}
