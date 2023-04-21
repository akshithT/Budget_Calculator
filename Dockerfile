# Start with the xampp image version 8
FROM tomsik68/xampp:8

# Copy the contents of your php app to the /www directory within the container
COPY ./php /www

# Create a directory within the container to hold the database files
RUN mkdir /db

# Copy the database files to the /db directory within the container
COPY ./db /db

# Run a command that first executes the init.sh script in the /db directory and then keeps the container running indefinitely
CMD ["/bin/sh", "-c", "/db/init.sh && while true; do sleep 1; done"]
