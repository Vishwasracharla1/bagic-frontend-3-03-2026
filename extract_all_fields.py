
import json
import os

filepath = 'public/knowledge_graph.json'
if not os.path.exists(filepath):
    print(f"File {filepath} not found.")
    exit(1)

node_schemas = {}
edge_schemas = {}
node_counts = {}
edge_counts = {}

# Using ijson or just streaming for large files is better, 
# but let's try standard json for now if memory permits (499k lines is roughly 100MB-200MB)
with open(filepath, 'r', encoding='utf-8') as f:
    try:
        data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        exit(1)

for node in data.get('nodes', []):
    ntype = node.get('type', 'unknown')
    if ntype not in node_schemas:
        node_schemas[ntype] = set()
        node_counts[ntype] = 0
    node_counts[ntype] += 1
    if 'data' in node:
        node_schemas[ntype].update(node['data'].keys())

for edge in data.get('edges', []):
    relation = edge.get('relation') or edge.get('type') or 'RELATED'
    if relation not in edge_schemas:
        edge_schemas[relation] = set()
        edge_counts[relation] = 0
    edge_counts[relation] += 1
    edge_schemas[relation].update(edge.keys())

print("## Node Types and Fields")
for ntype in sorted(node_schemas.keys()):
    fields = sorted(list(node_schemas[ntype]))
    print(f"### {ntype} ({node_counts[ntype]} nodes)")
    for f in fields:
        print(f"- {f}")
    print()

print("## Edge Types and Fields")
if not edge_schemas:
    print("No edges found in the data.")
else:
    for relation in sorted(edge_schemas.keys()):
        fields = sorted(list(edge_schemas[relation]))
        print(f"### {relation} ({edge_counts[relation]} edges)")
        for f in fields:
            print(f"- {f}")
        print()
