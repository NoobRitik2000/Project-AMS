import React, { useState } from 'react';

function AssignAsset() {
    const [userId, setUserId] = useState('');
    const [assetId, setAssetId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/api/assign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: userId, asset_id: assetId })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <input type="text" placeholder="Asset ID" value={assetId} onChange={(e) => setAssetId(e.target.value)} />
            <button type="submit">Assign Asset</button>
        </form>
    );
}

export default AssignAsset;