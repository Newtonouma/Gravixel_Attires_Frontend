import bcrypt from 'bcryptjs';

export interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'customer';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Default admin user (password: admin123)
const adminPasswordHash = bcrypt.hashSync('admin123', 12);

// Default customer user (password: customer123)
const customerPasswordHash = bcrypt.hashSync('customer123', 12);

export const users: UserData[] = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@gravixelattires.com',
    password: adminPasswordHash,
    role: 'admin',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'customer-1',
    name: 'John Doe',
    email: 'john@example.com',
    password: customerPasswordHash,
    role: 'customer',
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z',
  },
];
