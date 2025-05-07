export enum TypeQuestion {
    YES_NO = 'YES_NO',           // Câu hỏi đúng/sai hoặc có/không
    MULTIPLE_CHOICE = 'MULTIPLE_CHOICE', // ABCD (nhiều lựa chọn, chọn 1)
    MULTI_SELECT = 'MULTI_SELECT',       // Nhiều lựa chọn, chọn nhiều (kiểu checkbox)
    FILL_IN_BLANK = 'FILL_IN_BLANK',     // Điền vào chỗ trống
    SHORT_ANSWER = 'SHORT_ANSWER',       // Tự luận ngắn (nhập text)
  }