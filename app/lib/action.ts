"use server";

import z from "zod";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const formSchema = z.object({
  id: z.string(),
  amount: z.coerce.number(), //set to coerce (change) from a string to a number while also validating its type
  customerId: z.string(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});
// Test it out:
const CreateInvoice = formSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0]; // new date with the format "YYYY-MM-DD"

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  revalidatePath('dashboard/invoices'); // Once the database has been updated, the /dashboard/invoices path will be revalidated, and fresh data will be fetched from the server.
  redirect('/dashboard/invoices'); // redirect the user back to the /dashboard/invoices page.
}
