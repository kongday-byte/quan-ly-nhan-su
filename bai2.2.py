# ===========================
# Cơ sở dữ liệu thư viện (dùng list)
# ===========================

# Tập hợp Authors
Authors = [
    {"AuthorID": 1, "AuthorName": "Nguyen Nhat Anh", "Country": "Vietnam"},
    {"AuthorID": 2, "AuthorName": "J.K. Rowling", "Country": "UK"},
    {"AuthorID": 3, "AuthorName": "Haruki Murakami", "Country": "Japan"}
]

# Tập hợp Books
Books = [
    {"BookID": 101, "Title": "Cho Toi Xin Mot Ve Di Tuoi Tho", "AuthorID": 1, "Genre": "Novel"},
    {"BookID": 102, "Title": "Mat Biec", "AuthorID": 1, "Genre": "Novel"},
    {"BookID": 201, "Title": "Harry Potter and the Philosopher's Stone", "AuthorID": 2, "Genre": "Fantasy"},
    {"BookID": 202, "Title": "Harry Potter and the Chamber of Secrets", "AuthorID": 2, "Genre": "Fantasy"},
    {"BookID": 301, "Title": "Norwegian Wood", "AuthorID": 3, "Genre": "Romance"},
    {"BookID": 302, "Title": "Kafka on the Shore", "AuthorID": 3, "Genre": "Fiction"}
]

# ===========================
# Các hàm xử lý (truy vấn + thêm dữ liệu)
# ===========================

def list_authors():
    print("\n=== Danh sách tác giả ===")
    for a in Authors:
        print(f"{a['AuthorID']}: {a['AuthorName']} ({a['Country']})")

def list_books():
    print("\n=== Danh sách sách ===")
    for b in Books:
        print(f"{b['BookID']}: {b['Title']} - {b['Genre']} (AuthorID={b['AuthorID']})")

def books_by_author(author_id):
    """Truy vấn: tìm tất cả sách của một tác giả"""
    result = [b for b in Books if b["AuthorID"] == author_id]
    return result

def join_books_authors():
    """Truy vấn kết (JOIN) giữa hai tập hợp"""
    result = []
    for b in Books:
        for a in Authors:
            if b["AuthorID"] == a["AuthorID"]:
                result.append({
                    "BookTitle": b["Title"],
                    "Genre": b["Genre"],
                    "AuthorName": a["AuthorName"]
                })
    return result

def add_author():
    print("\n=== Thêm tác giả mới ===")
    author_id = int(input("Nhập AuthorID: "))
    name = input("Nhập tên tác giả: ")
    country = input("Nhập quốc gia: ")
    Authors.append({"AuthorID": author_id, "AuthorName": name, "Country": country})
    print("✅ Đã thêm tác giả thành công!")

def add_book():
    print("\n=== Thêm sách mới ===")
    book_id = int(input("Nhập BookID: "))
    title = input("Nhập tên sách: ")
    author_id = int(input("Nhập AuthorID (phải tồn tại trong Authors): "))
    genre = input("Nhập thể loại: ")
    Books.append({"BookID": book_id, "Title": title, "AuthorID": author_id, "Genre": genre})
    print("✅ Đã thêm sách thành công!")

# ===========================
# Menu chương trình
# ===========================

def menu():
    while True:
        print("\n===== MENU =====")
        print("1. Xem danh sách tác giả")
        print("2. Xem danh sách sách")
        print("3. Xem sách của 1 tác giả")
        print("4. Xem tất cả sách kèm tác giả")
        print("5. Thêm tác giả mới")
        print("6. Thêm sách mới")
        print("0. Thoát")
        choice = input("Chọn: ")

        if choice == "1":
            list_authors()
        elif choice == "2":
            list_books()
        elif choice == "3":
            author_id = int(input("Nhập AuthorID: "))
            books = books_by_author(author_id)
            if books:
                print(f"=== Sách của AuthorID={author_id} ===")
                for b in books:
                    print(f"- {b['Title']} ({b['Genre']})")
            else:
                print("❌ Không tìm thấy sách.")
        elif choice == "4":
            print("=== Danh sách sách kèm tác giả ===")
            for item in join_books_authors():
                print(f"{item['BookTitle']} - {item['Genre']} (by {item['AuthorName']})")
        elif choice == "5":
            add_author()
        elif choice == "6":
            add_book()
        elif choice == "0":
            print("👋 Thoát chương trình.")
            break
        else:
            print("❌ Lựa chọn không hợp lệ, thử lại!")

# ===========================
# Chạy chương trình
# ===========================

menu()
