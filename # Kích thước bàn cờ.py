"""
Giải bài toán Hành trình của quân Mã (Knight's Tour) bằng quay lui.

Cách dùng nhanh:
- Đổi BOARD_SIZE để thay kích thước bàn cờ N x N.
- Chạy file để xem lời giải bắt đầu từ (0, 0).
"""

# Kích thước bàn cờ (đổi số này để đổi kích thước)
BOARD_SIZE = 8

# 8 nước đi hợp lệ của quân mã (dx, dy)
KNIGHT_MOVES = [
    (2, 1), (1, 2), (-1, 2), (-2, 1),
    (-2, -1), (-1, -2), (1, -2), (2, -1),
]


def is_valid_cell(x, y, board):
    """Ô (x, y) nằm trong bàn cờ và chưa đi qua (== -1)."""
    return 0 <= x < BOARD_SIZE and 0 <= y < BOARD_SIZE and board[x][y] == -1


def backtrack_knight(x, y, step_index, board):
    """Thử đi tiếp từ (x, y) với thứ tự bước là step_index."""
    # Đã đi được đủ BOARD_SIZE * BOARD_SIZE ô
    if step_index == BOARD_SIZE * BOARD_SIZE:
        return True

    # Thử lần lượt 8 hướng
    for dx, dy in KNIGHT_MOVES:
        next_x = x + dx
        next_y = y + dy
        if is_valid_cell(next_x, next_y, board):
            board[next_x][next_y] = step_index
            if backtrack_knight(next_x, next_y, step_index + 1, board):
                return True
            # Quay lui nếu không tìm được đường đi tiếp
            board[next_x][next_y] = -1

    return False


def print_board(board):
    """In bàn cờ gọn, canh cột theo số chữ số lớn nhất."""
    width = len(str(BOARD_SIZE * BOARD_SIZE - 1))
    for row in board:
        line = " ".join(
            f"{cell:>{width}}" if cell != -1 else ".".rjust(width)
            for cell in row
        )
        print(line)


def solve_knight_tour(start_x=0, start_y=0):
    """Giải và in lời giải nếu có, bắt đầu từ (start_x, start_y)."""
    board = [[-1 for _ in range(BOARD_SIZE)] for _ in range(BOARD_SIZE)]
    board[start_x][start_y] = 0

    if backtrack_knight(start_x, start_y, 1, board):
        print_board(board)
    else:
        print("Không có lời giải")


if __name__ == "__main__":
    solve_knight_tour()
    