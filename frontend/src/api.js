const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const createBucket = async (bucketName) => {
    const response = await fetch(`${API_BASE}/buckets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bucketName }),
    });
    return response.json();
};

export const listBuckets = async () => {
    const response = await fetch(`${API_BASE}/buckets`);
    if (!response.ok) {
        throw new Error("Failed to fetch bucket list");
    }
    return response.json();
};
