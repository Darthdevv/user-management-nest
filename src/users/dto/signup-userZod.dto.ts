import { z } from 'zod';

export const signUpSchema = z
  .object({
    username: z.string().min(2, 'Username must be at least 2 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    age: z.number().min(18, 'Age must be at least 18'),
    email: z.string().email('Invalid email format'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type CreateUserDto = z.infer<typeof signUpSchema>;
