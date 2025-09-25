import React, { useState } from 'react';

interface OrderFormProps {
  products: any[];
  onSuccess?: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ products, onSuccess }) => {
  const [form, setForm] = useState({
    email: '',
    name: '',
    phoneNumber: '',
    city: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, products }),
      });
      if (!res.ok) throw new Error('Order failed');
      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="name" type="text" placeholder="Full Name" value={form.name} onChange={handleChange} required />
      <input name="phoneNumber" type="tel" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} required />
      <input name="city" type="text" placeholder="Town/City" value={form.city} onChange={handleChange} required />
      <input name="address" type="text" placeholder="Address" value={form.address} onChange={handleChange} />
      <button type="submit" disabled={loading}>Place Order</button>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">Order placed! Check your email for login details.</div>}
    </form>
  );
};

export default OrderForm;
