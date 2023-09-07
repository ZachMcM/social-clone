"use client"

import * as z from "zod"

const formSchema = z.object({
  name: z.string().nonempty({ message: "Name can't be empty" }),
  email: z.string().email(),
  
})

export function UserForm() {

}