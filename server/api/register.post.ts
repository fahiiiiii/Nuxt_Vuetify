import { readBody } from 'h3'
import { z, ZodError } from 'zod'
import nodemailer from 'nodemailer'
import { useRuntimeConfig } from '#imports'

const schema = z.object({
  fname: z.string().min(1, 'First name is required'),
  lname: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const result = schema.safeParse(body)

  // ✅ FIX: Use `result.error.issues` instead of `result.error.errors`
  if (!result.success) {
    const errors: Record<string, string> = {}

    // ✅ FIX: Provide explicit type for `err`
    result.error.issues.forEach((err: ZodError['issues'][number]) => {
      const field = err.path[0] as string
      errors[field] = err.message
    })

    
    console.error('Validation Errors:', errors)

  return {
    statusCode: 400,
    statusMessage: 'Validation failed',
    errors,
  }
  }

  const { fname, lname, email, password } = result.data

  // ✅ If you want to store user in DB, insert DB logic here

  // 📨 Send confirmation email
  const config = useRuntimeConfig()

  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: Number(config.SMTP_PORT),
    secure: false,
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: `"Support" <${config.SMTP_USER}>`,
    to: email,
    subject: 'Registration Successful',
    html: `
      <h3>Hello ${fname} ${lname},</h3>
      <p>Thanks for registering with us!</p>
      <hr/>
      <p><strong>Your Information:</strong></p>
      <ul>
        <li>Email: ${email}</li>
        <li>Password: ${password}</li>
      </ul>
    `,
  })

  return {
    statusCode: 200,
    message: 'Registration successful. Confirmation email sent.',
  }
})
