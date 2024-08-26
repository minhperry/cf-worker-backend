import { Context } from "hono";
import { html, raw } from "hono/html";

let list = {
    'nui': 'Nui chữ nếu đủ cân',
    'rong': 'Rong trộn cơm lỡ ăn hết rồi',
    'sot-kewpie': '(Sốt kewpie)',
    'ca-phe': 'Cà phê Trung Nguyên',
    'nvh': 'Ngũ vị hương',
    'tra': 'Trà làm trà đá',
    'do-kho': 'Mì, miến, phở khô, (mì gói)',
    'mi-trung':'Mì trứng',
    'hsk': 'Hải sản khô'
}

export const serveDanhSach = (c: Context) => {
    return c.html(html`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Danh Sách</title>
            <style>
                ul { list-style-type: none; padding: 0; font-size: 25px; }
                li { margin-bottom: 1em; }
                input[type="checkbox"] { transform: scale(1.5); width: 3em}
            </style>
        </head>
        <body>
        <h1>Danh sách</h1>
        <p>(trong ngoặc) là ko cần thiết lắm. checkbox sẽ được lưu trên máy khi thoát.</p>
        <ul>
            ${Object.entries(list).map(([key, value]) => html`
                <li>
                    <input type="checkbox" id=${key} name=${key} value=${key}>
                    <label for=${key}>${value}</label>
                </li>
            `)}
        </ul>
        <script>
                
                function saveCheckboxState() {
                    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
                    checkboxes.forEach(checkbox => {
                        localStorage.setItem(checkbox.id, checkbox.checked);
                    });
                }

                function loadCheckboxState() {
                    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
                    checkboxes.forEach(checkbox => {
                        const checked = localStorage.getItem(checkbox.id) === 'true';
                        checkbox.checked = checked;
                    });
                }

                window.onload = loadCheckboxState;

                document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                    checkbox.addEventListener('change', saveCheckboxState);
                });
        </script>
        </body>
        `)
} 