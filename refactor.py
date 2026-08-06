import re

def refactor():
    with open('src/components/renderer/ComponentRenderer.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = re.sub(r'e\.currentTarget\.innerText(?:\.trim\(\))?', 'e.currentTarget.innerHTML', content)
    
    idx = 0
    new_content = ""
    matches = 0
    
    while True:
        pos = content.find('contentEditable={interactive}', idx)
        if pos == -1:
            new_content += content[idx:]
            break
            
        close_idx = content.find('</', pos)
        if close_idx == -1:
            new_content += content[idx:]
            break
            
        tag_end_idx = content.find('>', close_idx)
        close_tag = content[close_idx:tag_end_idx+1]
        
        last_gt = content.rfind('>', pos, close_idx)
        
        if last_gt != -1:
            inner_content = content[last_gt+1:close_idx].strip()
            
            # Check if inner_content looks exactly like a single variable `{props.something}`
            # or `{props.something || "default"}`
            # We don't want it to match if there are nested tags, which is guaranteed if last_gt is the opening tag
            
            # Let's see if the inner content is just a variable
            if re.match(r'^\{\s*[a-zA-Z0-9_.\?\|"\'\[\] ]+\s*\}$', inner_content):
                var = inner_content[1:-1].strip()
                if 'dangerouslySetInnerHTML' not in content[pos:last_gt]:
                    new_content += content[idx:last_gt] + f' dangerouslySetInnerHTML={{{{ __html: {var} }}}} />'
                    idx = tag_end_idx + 1
                    matches += 1
                    continue
            
            # Or if it's just plain text (letters, numbers, some punctuation)
            elif inner_content and re.match(r'^[\w\s\.,!\?\'"&\-\(\)]+$', inner_content):
                text = inner_content
                if 'dangerouslySetInnerHTML' not in content[pos:last_gt]:
                    new_content += content[idx:last_gt] + f' dangerouslySetInnerHTML={{{{ __html: "{text}" }}}} />'
                    idx = tag_end_idx + 1
                    matches += 1
                    continue
                    
        # Fallback if it didn't match the safe patterns
        new_content += content[idx:tag_end_idx+1]
        idx = tag_end_idx + 1

    print(f"Replaced {matches} instances.")
    
    with open('src/components/renderer/ComponentRenderer.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)

if __name__ == '__main__':
    refactor()
