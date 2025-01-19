import requests
import json

def get_all_file_links(owner, repo, path="", token=None):
    """
    פונקציה רקורסיבית שמוצאת את כל הקישורים לקבצים, כולל בתת-תיקיות
    """
    file_links = []
    api_url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}"
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }

    try:
        response = requests.get(api_url, headers=headers)
        if response.status_code == 200:
            items = response.json()
            
            # אם קיבלנו פריט בודד, נהפוך אותו לרשימה
            if not isinstance(items, list):
                items = [items]
            
            for item in items:
                if item["type"] == "file":
                    # אם זה קובץ, נוסיף את הקישור שלו
                    file_links.append({
                        "path": item["path"],
                        "download_url": item["download_url"]
                    })
                elif item["type"] == "dir":
                    # אם זו תיקייה, נקרא רקורסיבית לתוכה
                    file_links.extend(get_all_file_links(owner, repo, item["path"], token))
            
            return file_links
    except Exception as e:
        print(f"שגיאה בקבלת תוכן מ-{path}: {str(e)}")
        return []

def save_links_to_file(links, filename="github_links.txt"):
    """
    שמירת הקישורים לקובץ טקסט
    """
    with open(filename, 'w', encoding='utf-8') as f:
        for link in links:
            f.write(f"Path: {link['path']}\nURL: {link['download_url']}\n\n")

def main():
    # פרטי ה-repository
    owner = "KALFANET"
    repo = "KAL2GO---Every-DATE-Needs-DATA"
    token = "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"

    print("מושך את כל הקישורים...")
    all_links = get_all_file_links(owner, repo, "", token)
    
    if all_links:
        print(f"\nנמצאו {len(all_links)} קבצים:")
        save_links_to_file(all_links)
        
        # הדפסת כל הקישורים למסך
        for link in all_links:
            print(f"\nPath: {link['path']}")
            print(f"URL: {link['download_url']}")
            
        print(f"\nכל הקישורים נשמרו לקובץ 'github_links.txt'")
    else:
        print("לא נמצאו קבצים")

if __name__ == "__main__":
    main()