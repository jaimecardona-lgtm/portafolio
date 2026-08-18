#!/usr/bin/env python3
"""Verify OpenRouter configuration is loaded correctly."""

import os
from dotenv import load_dotenv
from pathlib import Path

# Load from .env in project root (not backend directory)
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path, override=True)

print("=" * 60)
print("🔍 JAC-IA Configuration Verification")
print("=" * 60)

# Check .env file exists
env_path = Path(__file__).parent / ".env"
if env_path.exists():
    print(f"✅ .env file found at: {env_path}")
else:
    print(f"❌ .env file NOT found at: {env_path}")

print()

# Check API Key
api_key = os.getenv("OPENROUTER_API_KEY")
if api_key:
    masked_key = api_key[:10] + "..." + api_key[-10:] if len(api_key) > 20 else "***"
    print(f"✅ OPENROUTER_API_KEY loaded: {masked_key}")
else:
    print("❌ OPENROUTER_API_KEY NOT loaded")

# Check Base URL
base_url = os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")
print(f"✅ OPENROUTER_BASE_URL: {base_url}")

# Check Models
primary_model = os.getenv("CHAT_PRIMARY_LLM", "google/gemma-3-4b-it:free")
fallback_model = os.getenv("CHAT_FALLBACK_LLM", "openrouter/free")
print(f"✅ PRIMARY_LLM: {primary_model}")
print(f"✅ FALLBACK_LLM: {fallback_model}")

# Check other settings
print(f"✅ TEMPERATURE: {os.getenv('CHAT_TEMPERATURE', '0.7')}")
print(f"✅ MAX_TOKENS: {os.getenv('CHAT_MAX_TOKENS', '800')}")
print(f"✅ TIMEOUT_MS: {os.getenv('CHAT_TIMEOUT_MS', '45000')}")

print()
print("=" * 60)
if api_key:
    print("✅ Configuration is complete. JAC-IA should work!")
else:
    print("❌ Configuration incomplete. Check your .env file.")
print("=" * 60)
