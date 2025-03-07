"use client"

import { useState } from "react"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EditUserDialog } from "./edit-user"

export default function UserTable( {users} ) {
    let [EditUser, setEditUser] = useState(false)
    let [DeleteUser, setDeleteUser] = useState(false)
  return (
    <div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableCell>
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Email Verified</TableCell>
                <TableCell>Registered At</TableCell>
                <TableCell>Actions</TableCell>
            </TableRow>
        </TableHeader>
        <TableBody>
            {users?.map((user, index) => (
            <TableRow key={index}>
                <TableCell>
                    <Checkbox />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.emailVerified ? "Yes" : "No"}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                                onClick={() => setEditUser(true)}
                            >Edit</DropdownMenuItem>
                            <DropdownMenuItem>Disable</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
            ))}
            {/* Add more rows as needed */}
        </TableBody>
        {EditUser && (
            <EditUserDialog open={true} />
            )}
    </Table>
    </div>
  )
}
