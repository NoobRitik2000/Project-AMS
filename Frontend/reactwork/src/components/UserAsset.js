import React, { useEffect, useState } from 'react';

function UserAssets({ userId }) {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        fetch(/api/User / ${ userId } / assets)
            .then(response => response.json())
            .then(data => setAssets(data));
    }, [userId]);

    return (
        <div>
            <h2>Assigned Assets:</h2>
            <ul>
                {assets.map(assignment => (
                    <li key={assignment.asset._id}>{assignment.asset.name} ({assignment.asset.type})</li>
                ))}
            </ul>
        </div>
    );
}

export default UserAssets;