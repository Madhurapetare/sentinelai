import pandas as pd
from sqlalchemy import create_engine
from urllib.parse import quote_plus

# Database connection details
DB_USER = "postgres"
import os
DB_PASSWORD = quote_plus(os.environ.get("DB_PASSWORD", "postgres123"))
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "sentinelai"

# Path to the full PaySim dataset
CSV_PATH = "notebooks/data/PS_20174392719_1491204439457_log.csv"

# How many rows to sample and load
SAMPLE_SIZE = 5000

print("Reading CSV file... this may take a moment for a large file.")
df = pd.read_csv(CSV_PATH)
print(f"Full dataset shape: {df.shape}")

# Take a random sample
sample_df = df.sample(n=SAMPLE_SIZE, random_state=42)
print(f"Sampled {SAMPLE_SIZE} rows")

# Rename columns to match our PostgreSQL table structure
sample_df = sample_df.rename(columns={
    "step": "step",
    "type": "type",
    "amount": "amount",
    "nameOrig": "sender_account",
    "oldbalanceOrg": "old_balance_sender",
    "newbalanceOrig": "new_balance_sender",
    "nameDest": "receiver_account",
    "oldbalanceDest": "old_balance_receiver",
    "newbalanceDest": "new_balance_receiver"
})

# Keep only the columns our table actually has
sample_df = sample_df[[
    "step", "type", "amount", "sender_account", "receiver_account",
    "old_balance_sender", "new_balance_sender",
    "old_balance_receiver", "new_balance_receiver"
]]

# Connect to PostgreSQL
engine = create_engine(f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}")

print("Inserting into PostgreSQL...")
sample_df.to_sql("transactions", engine, if_exists="append", index=False)

print(f"Done! Inserted {SAMPLE_SIZE} transactions into the database.")