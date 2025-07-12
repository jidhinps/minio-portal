const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const createBucket = async (bucketName) => {
    try {
        const response = await fetch(`${API_URL}/create-bucket`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bucket_name: bucketName }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to create bucket:', error);
        throw error;
    }
};
