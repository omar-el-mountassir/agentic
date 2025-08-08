#!/usr/bin/env python3
from pathlib import Path
import json
import sys
from jsonschema import validate, ValidationError

root = Path(__file__).resolve().parents[1]
schema_path = root/".claude"/"knowledge"/"schema.json"
data_path = root/"deep_dive_machine_actionable.json"

try:
    schema = json.loads(schema_path.read_text(encoding="utf-8"))
except Exception as e:
    print(f"Failed reading schema: {e}")
    sys.exit(1)

try:
    data = json.loads(data_path.read_text(encoding="utf-8"))
except Exception as e:
    print(f"Failed reading data: {e}")
    sys.exit(1)

try:
    validate(instance=data, schema=schema)
except ValidationError as e:
    print("Schema validation failed:\n" + str(e))
    sys.exit(1)

print("Deep dive digest is valid (Python/uv).")
