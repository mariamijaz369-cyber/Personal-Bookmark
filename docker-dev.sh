#!/bin/bash

echo "🚀 Starting development environment..."
docker-compose -f docker-compose.dev.yml up --build
chmod +x docker-dev.sh