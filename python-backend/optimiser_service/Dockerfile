
# Use the official Node.js 14 image as the base image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY requirements.txt /app

# Install the dependencies
RUN pip install --upgrade pip setuptools wheel \
    && pip install --only-binary :all: -r requirements.txt 

# Build the application
COPY app.py /app

# Expose the port that the application will listen on
EXPOSE 6969

# Start the application
CMD ["python", "./app.py"]