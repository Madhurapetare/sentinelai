import pandas as pd

# Read the full dataset
df = pd.read_csv("notebooks/data/PS_20174392719_1491204439457_log.csv")

# Take a small sample - just for GitHub demo purposes
sample = df.sample(n=100, random_state=42)

# Save it as a small file
sample.to_csv("notebooks/data/sample_transactions.csv", index=False)

print("Created sample_transactions.csv with 100 rows")