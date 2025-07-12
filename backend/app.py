from flask import Flask, request, jsonify
from minio import Minio
from minio.error import S3Error
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# MinIO client configuration
minio_client = Minio(
    endpoint=os.getenv("MINIO_ENDPOINT", "minio:9000"),
    access_key=os.getenv("MINIO_ACCESS_KEY", "admin"),
    secret_key=os.getenv("MINIO_SECRET_KEY", "admin123"),
    secure=False
)

@app.route("/create-bucket", methods=["POST"])
def create_bucket():
    data = request.get_json()
    bucket_name = data.get("bucket_name")
    if not bucket_name:
        return jsonify({"error": "Bucket name is required"}), 400

    try:
        if not minio_client.bucket_exists(bucket_name):
            minio_client.make_bucket(bucket_name)
            return jsonify({"message": f"Bucket '{bucket_name}' created."}), 201
        else:
            return jsonify({"message": f"Bucket '{bucket_name}' already exists."}), 200
    except S3Error as err:
        return jsonify({"error": str(err)}), 500

@app.route("/list-buckets", methods=["GET"])
def list_buckets():
    try:
        buckets = minio_client.list_buckets()
        bucket_names = [bucket.name for bucket in buckets]
        return jsonify({"buckets": bucket_names}), 200
    except S3Error as err:
        return jsonify({"error": str(err)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
