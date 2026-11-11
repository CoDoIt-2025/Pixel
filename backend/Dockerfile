FROM python:3.11-slim

# Prevent Python from writing .pyc and buffering stdout/stderr
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DEFAULT_TIMEOUT=120

WORKDIR /app

# Install curl for healthchecks
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip to latest version
RUN pip install --no-cache-dir --upgrade pip setuptools wheel

# Install dependencies with retry and timeout protection
COPY requirements.txt .
RUN pip install --no-cache-dir --default-timeout=120 --retries=5 \
    --trusted-host pypi.org --trusted-host files.pythonhosted.org \
    -r requirements.txt

# Copy application code
COPY . .

# Ensure data and uploads directories exist and run database seed
RUN mkdir -p data uploads && python seed.py

EXPOSE 8000

ENV HOST=0.0.0.0
ENV PORT=8000

CMD ["python", "run.py"]

