def filter_node_modules(input_file="github_links.txt", output_file="filtered_links.txt"):
    with open(input_file, 'r', encoding='utf-8') as infile:
        lines = infile.readlines()
    
    # קריאת הקובץ בקבוצות של 3 שורות (path, url, רווח)
    filtered_content = []
    i = 0
    while i < len(lines):
        path_line = lines[i].strip() if i < len(lines) else ""
        url_line = lines[i+1].strip() if i+1 < len(lines) else ""
        empty_line = lines[i+2] if i+2 < len(lines) else "\n"
        
        # אם הנתיב לא מכיל node_modules, שומרים את הקבוצה
        if "node_modules" not in path_line and "node_modules" not in url_line:
            filtered_content.extend([path_line + "\n", url_line + "\n", empty_line])
        
        i += 3
    
    # כתיבה לקובץ החדש
    with open(output_file, 'w', encoding='utf-8') as outfile:
        outfile.writelines(filtered_content)

    # ספירת הקישורים שנשארו
    link_count = len(filtered_content) // 3
    removed_count = (len(lines) // 3) - link_count
    
    print(f"הוסרו {removed_count} קישורים שמכילים node_modules")
    print(f"נשארו {link_count} קישורים")
    print(f"התוצאה נשמרה בקובץ: {output_file}")

if __name__ == "__main__":
    filter_node_modules()