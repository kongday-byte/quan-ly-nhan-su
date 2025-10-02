def can_partition_rec(A):
    S = sum(A)
    if S % 2 == 1:
        return False
    target = S // 2
    n = len(A)

    def dfs(i, cur):
        # i: chỉ số hiện tại, cur: tổng đã lấy
        if cur == target:
            return True
        if cur > target or i == n:
            return False
        # chọn phần tử i
        if dfs(i+1, cur + A[i]):
            return True
        # không chọn phần tử i
        return dfs(i+1, cur)

    return dfs(0, 0)
