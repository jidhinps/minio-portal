 
import subprocess

def create_bucket(bucket):
    cmd = f"mc alias set local http://minio:9000 admin admin123 && mc mb local/{bucket}"
    result = subprocess.call(cmd, shell=True)
    if result == 0:
        return True, f"Bucket {bucket} created"
    return False, "Failed to create bucket"
