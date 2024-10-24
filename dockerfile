# Use the official PostgreSQL image
FROM postgres:14

# Set environment variables for PostgreSQL initialization
ENV POSTGRES_USER=root
ENV POSTGRES_PASSWORD=root
ENV POSTGRES_DB=foodexplorer-development

# Copy initialization scripts to the Docker container
# This will automatically run any *.sql or *.sh files in the /docker-entrypoint-initdb.d/ directory.
# COPY ./init-scripts/ /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port (default 5432)
EXPOSE 5432