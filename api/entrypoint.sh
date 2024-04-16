#!/bin/bash

# Run migrations
python3 manage.py makemigrations
python3 manage.py migrate

# Seed Database
python3 manage.py loaddata superusers.json
python3 manage.py loaddata payment_methods.json
python3 manage.py loaddata cleaning_frequencies.json
python3 manage.py loaddata clean_types.json
python3 manage.py loaddata sub_services.json

# Collect static files
python manage.py collectstatic

# Run the specified command (if any)
exec "$@"