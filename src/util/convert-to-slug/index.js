// Chuyển đổi tiếng Việt có dấu thành không dấu
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const convertSlug = (input) => {
    return removeAccents(input.trim())     // Loại bỏ khoảng trắng ở đầu và cuối
        .toLowerCase()                    // Chuyển tất cả thành chữ thường
        .replace(/\s+/g, '-')             // Thay dấu cách bằng dấu gạch ngang
        .replace(/-+$/g, '');             // Xóa gạch ngang ở cuối chuỗi nếu có
}
