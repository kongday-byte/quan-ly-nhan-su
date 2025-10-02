"""
Bài toán phân tích số nguyên (Integer Partition):
Liệt kê tất cả các cách viết N thành tổng các số nguyên dương, không phân biệt thứ tự.

Cách làm: quay lui sinh dãy không tăng để tránh trùng hoán vị.
"""

from typing import List


def list_partitions(n: int) -> List[List[int]]:
    """Trả về danh sách các phân tích của n, mỗi phân tích là 1 danh sách không tăng."""
    results: List[List[int]] = []

    def backtrack(remaining: int, max_next: int, current: List[int]) -> None:
        if remaining == 0:
            results.append(current.copy())
            return
        # Chọn số hạng kế tiếp từ lớn xuống nhỏ, không vượt quá max_next
        for x in range(min(remaining, max_next), 0, -1):
            backtrack(remaining - x, x, current + [x])

    backtrack(n, n, [])
    return results


def print_partitions(n: int) -> None:
    parts = list_partitions(n)
    print(f"Các cách phân tích {n} là (tổng cộng {len(parts)} cách):")
    for p in parts:
        print(" + ".join(map(str, p)))


if __name__ == "__main__":
    # Ví dụ chạy
    N = 9

    print_partitions(N)
