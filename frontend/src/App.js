import React, { useState } from "react";
import { createBucket, listBuckets } from "./api";

function App() {
    const [bucketName, setBucketName] = useState("");
    const [buckets, setBuckets] = useState([]);

    const handleCreate = async () => {
        if (!bucketName) return;
        await createBucket(bucketName);
        fetchBuckets();
    };

    const fetchBuckets = async () => {
        const data = await listBuckets();
        setBuckets(data);
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1>MinIO Self-Service Portal</h1>
            <input
                value={bucketName}
                onChange={(e) => setBucketName(e.target.value)}
                placeholder="Enter bucket name"
            />
            <button onClick={handleCreate}>Create Bucket</button>
            <button onClick={fetchBuckets}>List Buckets</button>
            <ul>
                {buckets.map((name) => (
                    <li key={name}>{name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
