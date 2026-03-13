
import os

input_file = 'public/knowledge_graph.json'
output_file = 'public/knowledge_graph_fixed.json'

if not os.path.exists(input_file):
    print(f"Error: {input_file} not found")
    exit(1)

print(f"Reading {input_file}...")
with open(input_file, 'r', encoding='utf-8') as f:
    content = f.read()

print("Replacing NaN with null...")
# Replacing unquoted NaN with null
# We should be careful not to replace NaN inside strings, but usually unquoted NaN in JSON is the culprit
fixed_content = content.replace(': NaN', ': null')

print(f"Writing to {output_file}...")
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(fixed_content)

print("Done. Swapping files...")
os.replace(output_file, input_file)
print("File fixed.")
