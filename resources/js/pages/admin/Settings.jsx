import React, { useState } from 'react';

export default function Settings() {
    const [formData, setFormData] = useState({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await fetch('/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Assuming you have a meta tag for CSRF in your blade file:
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                // Display validation error (like wrong current password or too short)
                const errorMsg = data.errors ? Object.values(data.errors)[0][0] : 'Something went wrong.';
                throw new Error(errorMsg);
            }

            setMessage(data.message);
            setFormData({ current_password: '', new_password: '', new_password_confirmation: '' });
            
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            
            <div className="bg-white p-6 rounded shadow max-w-md">
                <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                
                {message && <div className="mb-4 text-green-600 bg-green-50 p-3 rounded">{message}</div>}
                {error && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Current Password</label>
                        <input type="password" name="current_password" value={formData.current_password} onChange={handleChange} className="w-full border p-2 rounded" required />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">New Password (Min 8 characters)</label>
                        <input type="password" name="new_password" value={formData.new_password} onChange={handleChange} className="w-full border p-2 rounded" required />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Confirm New Password</label>
                        <input type="password" name="new_password_confirmation" value={formData.new_password_confirmation} onChange={handleChange} className="w-full border p-2 rounded" required />
                    </div>

                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
}